import React, { useState, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import {
  orders as mockOrders,
  products,
  customers,
  OrderType,
  type Order,
} from "./mockData";
import { getCustomerName, getProductName, getProductPrice, getCustomerCredit } from "./utils/helpers";
import Header from "./components/Header";
import OrderCard from "./components/OrderCard";
import "./index.css";

function App() {
  const [orders, setOrders] = useState<typeof mockOrders>([]);
  const [displayedOrders, setDisplayedOrders] = useState<typeof mockOrders>([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [initialStock, setInitialStock] = useState(150);
  const [versionKey, setVersionKey] = useState(0); // <-- Add versionKey state

  const { ref, inView } = useInView();

  const orderPriority: Record<OrderType, number> = {
    [OrderType.EMERGENCY]: 1,
    [OrderType.OVER_DUE]: 2,
    [OrderType.STANDARD]: 3,
    [OrderType.NEW]: 4,
  };

  const sortedOrders = useMemo(() => {
    return [...mockOrders].sort((a, b) => {
      const priorityA = orderPriority[a.order_type];
      const priorityB = orderPriority[b.order_type];
      if (priorityA !== priorityB) return priorityA - priorityB;
      return new Date(a.order_date).getTime() - new Date(b.order_date).getTime();
    });
  }, []);

  // --- Auto Allocation ---
  useEffect(() => {
    const customerCredits: Record<string, number> = {};
    customers.forEach((c) => {
      customerCredits[c.id] = c.credit_limit;
    });

    let currentStock = initialStock;
    const tempOrders: Order[] = JSON.parse(JSON.stringify(sortedOrders)); // Create a deep copy

    // First Pass: Fair Allocation - give at least one item to each customer if possible
    const customersWithOrders = [...new Set(tempOrders.map((order: Order) => order.customer_id))];

    for (const customerId of customersWithOrders) {
      const firstOrder = tempOrders.find((order: Order) => order.customer_id === customerId);
      if (firstOrder) {
        const product = products.find(p => p.id === firstOrder.product_id);
        const price = product?.price || 0;
        if (currentStock > 0 && customerCredits[customerId] >= price) {
          firstOrder.allocated_qty = 1;
          currentStock -= 1;
          customerCredits[customerId] -= price;
        }
      }
    }

    // Second Pass: Allocate the rest based on priority
const allocatedOrders = tempOrders.map((order: Order) => {
  let allocated_qty = order.allocated_qty || 0;
  if (currentStock > 0) {
    const product = products.find((p) => p.id === order.product_id);
    const customer = customers.find((c) => c.id === order.customer_id);

    if (product && customer) {
      const maxByRequest = order.quantity - allocated_qty;
      const maxByStock = currentStock;
      const maxByCredit = Math.floor(customerCredits[customer.id] / product.price);

      const allocationAmount = Math.min(maxByRequest, maxByStock, maxByCredit);

      if (allocationAmount > 0) {
        allocated_qty += allocationAmount;
        currentStock -= allocationAmount;
        customerCredits[customer.id] -= allocationAmount * product.price;

        // Prevent credit from going below zero
        if (customerCredits[customer.id] < 0) {
          // Rollback allocation that exceeded credit
          const overAllocated = Math.ceil(Math.abs(customerCredits[customer.id]) / product.price);
          allocated_qty -= overAllocated;
          currentStock += overAllocated;
          customerCredits[customer.id] = 0;
        }
      }
    }
  }

  return { ...order, allocated_qty, suggested_qty: allocated_qty };
});


    // Sort for display: prioritize orders with allocated_qty > 0
    const sortedForDisplay = [...allocatedOrders].sort((a, b) => {
      const aAllocated = a.allocated_qty || 0;
      const bAllocated = b.allocated_qty || 0;

      if (aAllocated > 0 && bAllocated === 0) return -1;
      if (aAllocated === 0 && bAllocated > 0) return 1;

      // Fall back to the original sorting
      const priorityA = orderPriority[a.order_type];
      const priorityB = orderPriority[b.order_type];
      if (priorityA !== priorityB) return priorityA - priorityB;
      return new Date(a.order_date).getTime() - new Date(b.order_date).getTime();
    });

    setOrders(sortedForDisplay);
    setDisplayedOrders(sortedForDisplay.slice(0, pageSize));
    setPage(1);
  }, [initialStock, sortedOrders, versionKey]); // <-- Add versionKey as dependency

  // --- Infinite Scroll ---
  useEffect(() => {
    if (inView && orders.length > displayedOrders.length) {
      const startIndex = page * pageSize;
      const endIndex = startIndex + pageSize;
      const nextOrders = orders.slice(startIndex, endIndex);
      if (nextOrders.length > 0) {
        setDisplayedOrders((prev) => [...prev, ...nextOrders]);
        setPage((prev) => prev + 1);
      }
    }
  }, [inView, page, orders, displayedOrders, pageSize]);

  // --- Stock Calculation ---
  const totalAllocated = useMemo(() => {
    return orders.reduce((sum, order) => sum + (order.allocated_qty || 0), 0);
  }, [orders]);

  const totalStock = initialStock - totalAllocated;

  // --- Price Calculation ---
  const totalPrice = useMemo(() => {
    return orders.reduce((sum, order) => {
      const product = products.find((p) => p.id === order.product_id);
      return sum + (order.allocated_qty || 0) * (product?.price || 0);
    }, 0);
  }, [orders]);

  // --- Manual Allocation ---
  const handleManualAllocate = (orderId: string, value: number) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        if (value > order.quantity) {
          console.error("Error: Allocation exceeds requested quantity!");
          return order;
        }
        return { ...order, allocated_qty: value };
      }
      return order;
    });

    const newTotalAllocated = updatedOrders.reduce(
      (sum, order) => sum + (order.allocated_qty || 0),
      0
    );
    if (newTotalAllocated > initialStock) {
      console.error("Error: Total allocated units exceed available stock!");
      return;
    }

    setOrders(updatedOrders);

    const updatedDisplayed = displayedOrders.map((order) => {
      const updated = updatedOrders.find((o) => o.id === order.id);
      return updated || order;
    });
    setDisplayedOrders(updatedDisplayed);
  };
  
  return (
    <div className="flex flex-col gap-4 p-8 bg-gray-100 min-h-screen font-sans">
      <div className="text-3xl font-bold mb-4">Allocation</div>
      {/* --- Version Key Button --- */}
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-fit"
        onClick={() => setVersionKey((prev) => prev + 1)}
      >
        Refresh Data (versionKey: {versionKey})
      </button>
      <Header totalStock={totalStock} totalPrice={totalPrice} />
      <div className="flex flex-col gap-4">
        {displayedOrders.map((order) => {
          const product = products.find((p) => p.id === order.product_id);
          const customer = customers.find((c) => c.id === order.customer_id);

          const customerClosing = orders.reduce((sum, o) => {
            if (o.customer_id === order.customer_id) {
              const p = products.find((prod) => prod.id === o.product_id);
              return sum + (o.allocated_qty || 0) * (p?.price || 0);
            }
            return sum;
          }, 0);

          return (
            <OrderCard
              key={order.id}
              order={order}
              onManualAllocate={handleManualAllocate}
              customerName={getCustomerName(order.customer_id)}
              productName={getProductName(order.product_id)}
              customerCredit={getCustomerCredit(order.customer_id)}
              productPrice={product?.price || 0}
              customerClosing={customerClosing}
            />
          );
        })}
      </div>
      {displayedOrders.length < orders.length && (
        <div
          ref={ref}
          className="h-10 flex items-center justify-center text-gray-400"
        >
          Loading more...
        </div>
      )}
    </div>
  );
}

export default App;
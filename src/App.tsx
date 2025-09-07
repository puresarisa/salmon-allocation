import { useState, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import {
  orders as mockOrders,
  products,
  customers,
  OrderType,
} from "./mockData";
import { getCustomerName, getProductName, getCustomerCredit } from "./utils/helpers";
import { allocateOrders } from "./utils/allocationUtils";
import { getRandomizedOrders } from "./utils/randomizeOrders";
import Header from "./components/Header";
import OrderCard from "./components/OrderCard";
import ErrorModal from "./components/ErrorModal";
import "./index.css";

const DEMO_RANDOMIZE = false;

function App() {
  const [orders, setOrders] = useState<typeof mockOrders>([]);
  const [displayedOrders, setDisplayedOrders] = useState<typeof mockOrders>([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [initialStock] = useState(450);
  const [versionKey, setVersionKey] = useState(0); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

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
    const sourceOrders =
      DEMO_RANDOMIZE && versionKey > 0
        ? getRandomizedOrders(sortedOrders)
        : sortedOrders;

    const allocatedOrders = allocateOrders(
      sourceOrders,
      products,
      customers,
      initialStock,
      orderPriority
    );

    // Intelligent prefetching for initial loading
    let visibleOrders: typeof mockOrders = [];
    let totalRequested = 0;
    let i = 0;
    while (
      i < allocatedOrders.length &&
      (visibleOrders.length < pageSize || totalRequested < initialStock)
    ) {
      visibleOrders.push(allocatedOrders[i]);
      totalRequested += allocatedOrders[i].request_qty;
      i++;
    }

    setOrders(allocatedOrders);
    setDisplayedOrders(visibleOrders);
    setPage(Math.ceil(visibleOrders.length / pageSize));
  }, [initialStock, sortedOrders, versionKey]);

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
      const price = product?.price[order.order_type] ?? 0;
      return sum + (order.allocated_qty || 0) * price;
    }, 0);
  }, [orders]);

  // --- Manual Allocation ---
  const handleManualAllocate = (orderId: string, value: number) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        if (value > order.request_qty) {
          setErrorMessage("Allocation exceeds requested request_qty!");
          setShowModal(true);
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
      setErrorMessage("Total allocated units exceed available stock!");
      setShowModal(true);
      return;
    }

    // --- Check credit constraint --- 
    const orderToUpdate = orders.find((order) => order.id === orderId);
    if (orderToUpdate) {
      const product = products.find((p) => p.id === orderToUpdate.product_id);
      const customer = customers.find((c) => c.id === orderToUpdate.customer_id);
      const price = product?.price[orderToUpdate.order_type] ?? 0;
      if (product && customer) {
        const allocatedAmount = value * price;
        const otherAllocated = orders
          .filter(
            (order) =>
              order.customer_id === customer.id &&
              order.id !== orderId
          )
          .reduce((sum, order) => {
            const prod = products.find((p) => p.id === order.product_id);
            const prodPrice = prod?.price[order.order_type] ?? 0;
            return sum + (order.allocated_qty || 0) * prodPrice;
          }, 0);
        if (allocatedAmount + otherAllocated > customer.credit_limit) {
          setErrorMessage("Allocation exceeds customer's credit limit!");
          setShowModal(true);
          return;
        }
      }
    }

    setOrders(updatedOrders);

    const updatedDisplayed = displayedOrders.map((order) => {
      const updated = updatedOrders.find((o) => o.id === order.id);
      return updated || order;
    });
    setDisplayedOrders(updatedDisplayed);
  };

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
        setErrorMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  return (
    <div className="flex flex-col gap-4 p-8 bg-gray-100 min-h-screen font-sans">
      <div className="text-3xl font-bold mb-4">Allocation</div>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-fit"
        onClick={() => setVersionKey((prev) => prev + 1)}
      >
        Refresh Data (versionKey: {versionKey})
      </button>
      <Header totalStock={totalStock} totalPrice={totalPrice} />

      <ErrorModal
        show={showModal}
        message={errorMessage}
        onClose={() => {
          setShowModal(false);
          setErrorMessage(null);
        }}
      />

      <div className="flex flex-col gap-4">
        {displayedOrders.map((order) => {
          const product = products.find((p) => p.id === order.product_id);
          const price = product?.price[order.order_type] ?? 0;

          const customerClosing = orders.reduce((sum, o) => {
            if (o.customer_id === order.customer_id) {
              const p = products.find((prod) => prod.id === o.product_id);
              const pPrice = p?.price[o.order_type] ?? 0;
              return sum + (o.allocated_qty || 0) * pPrice;
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
              productPrice={price}
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
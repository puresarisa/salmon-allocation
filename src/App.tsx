import React, { useState, useEffect, useMemo } from 'react';
import './index.css';
import { orders as mockOrders, products as mockProducts, customers as mockCustomers, OrderType } from './mockData';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// --- Reusable Order Card Component ---
const OrderCard: React.FC<{
  order: (typeof mockOrders)[0];
  onManualAllocate: (orderId: string, value: number) => void;
  getCustomerName: (id: string) => string;
  getProductName: (id: string) => string;
}> = ({ order, onManualAllocate, getCustomerName, getProductName }) => {
  const [inputValue, setInputValue] = useState<number>(order.allocated_qty);

  // Update input value when order data changes
  useEffect(() => {
    setInputValue(order.allocated_qty);
  }, [order.allocated_qty]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    // Limit the input value to not exceed the requested quantity
    const finalValue = isNaN(value) ? 0 : Math.min(value, order.quantity);
    setInputValue(finalValue);
    onManualAllocate(order.id, finalValue);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <div className="text-xl font-bold text-gray-800">
          ORDER-{order.id.split('_')[1]}
        </div>
        <div className={`
          px-3 py-1 text-sm font-semibold rounded-full
          ${order.order_type === OrderType.HIGH_PRIORITY ? 'bg-red-500 text-white' : 'bg-gray-700 text-white'}
        `}>
          {order.order_type.toUpperCase().replace('_', ' ')}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-y-4 text-sm mb-6">
        <div className="flex flex-col">
          <span className="text-gray-500">Customer</span>
          <span className="font-medium text-gray-900">{getCustomerName(order.customer_id)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500">Credit Remaining</span>
          <span className="font-medium text-gray-900">3,000.00 THB</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500">Closing</span>
          <span className="font-medium text-gray-900">3,000.00 THB</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500">Product</span>
          <span className="font-medium text-gray-900">{getProductName(order.product_id)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500">Remark</span>
          <span className="font-medium text-gray-900">1 day delivery Product</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500">Suggestion</span>
          <span className="font-medium text-gray-900">{order.quantity} Unit</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500">Price Per Unit</span>
          <span className="font-medium text-gray-900">515.75 THB</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500">Request Qty</span>
          <span className="font-medium text-gray-900">{order.quantity} Unit</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500">Qty</span>
          <input
            type="number"
            min="0"
            max={order.quantity}
            className="w-20 p-1 mt-1 border-b border-gray-400 focus:outline-none focus:border-blue-500"
            value={inputValue}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
function App() {
  const [orders, setOrders] = useState<typeof mockOrders>([]);
  const [initialStock, setInitialStock] = useState(1500); // Set initial stock
  
  // Calculate remaining stock
  const totalAllocated = useMemo(() => {
    return orders.reduce((sum, order) => sum + (order.allocated_qty || 0), 0);
  }, [orders]);

  const totalStock = initialStock - totalAllocated;

  // Calculate total price of all allocated units
  const totalPrice = useMemo(() => {
    const pricePerUnit = 515.75;
    const value = totalAllocated * pricePerUnit;
    return new Intl.NumberFormat('th-TH', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    }).format(value);
  }, [totalAllocated]);

  // Fetch initial data on component mount
  useEffect(() => {
    // Simulate fetching data from a server
    // Sort orders by priority and then by date
    const sortedOrders = [...mockOrders].sort((a, b) => {
      if (a.order_type === OrderType.HIGH_PRIORITY && b.order_type !== OrderType.HIGH_PRIORITY) return -1;
      if (a.order_type !== OrderType.HIGH_PRIORITY && b.order_type === OrderType.HIGH_PRIORITY) return 1;
      return new Date(a.order_date).getTime() - new Date(b.order_date).getTime();
    });

    let currentStock = initialStock;
    const initialAllocatedOrders = sortedOrders.map(order => {
      let allocated_qty = 0;
      if (currentStock > 0) {
        allocated_qty = Math.min(order.quantity, currentStock);
        currentStock -= allocated_qty;
      }
      return { ...order, allocated_qty };
    });

    setOrders(initialAllocatedOrders);
  }, [initialStock]); // Rerun if initial stock changes

  const handleManualAllocate = (orderId: string, value: number) => {
    // Find the order to update
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        // Enforce the new business logic: Qty cannot exceed Request Qty
        if (value > order.quantity) {
          return order; // Return original order to prevent invalid update
        }
        return { ...order, allocated_qty: value };
      }
      return order;
    });

    // Check if total allocated exceeds initial stock
    const newTotalAllocated = updatedOrders.reduce((sum, order) => sum + (order.allocated_qty || 0), 0);
    if (newTotalAllocated > initialStock) {
      alert("Error: Total allocated units exceed available stock!");
      return;
    }

    // Update the state with the new orders
    setOrders(updatedOrders);
  };

  // Helper function to get customer name
  const getCustomerName = (customerId: string) => mockCustomers.find(c => c.id === customerId)?.name || 'Unknown';

  // Helper function to get product name
  const getProductName = (productId: string) => mockProducts.find(p => p.id === productId)?.name || 'Unknown';

  return (
    <div className="flex flex-col gap-4 p-8 bg-gray-100 min-h-screen font-sans">
      <div className="text-3xl font-bold mb-4">Allocation</div>
      <div className="text-xl font-semibold text-gray-700">
        Salmon <span className="text-2xl font-bold text-gray-900">{totalStock}</span> Unit
        <span className="ml-8">Total</span> <span className="text-2xl font-bold text-gray-900">{totalPrice}</span> THB
      </div>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onManualAllocate={handleManualAllocate}
            getCustomerName={getCustomerName}
            getProductName={getProductName}
          />
        ))}
      </div>
      <div className="text-center text-gray-500 my-8">
        All orders loaded.
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import type { FC } from 'react';
import { OrderType } from '../mockData';

interface OrderCardProps {
  order: any;
  onManualAllocate: (orderId: string, quantity: number) => void;
  customerName: string;
  productName: string;
  customerCredit: number;
  productPrice: number;
  customerClosing: number;
}

const OrderCard: FC<OrderCardProps> = ({ order, onManualAllocate, customerName, productName, customerCredit, productPrice, customerClosing }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Parse the input value to a number. If it's an empty string, treat it as 0.
    const qty = value === '' ? 0 : parseInt(value, 10);
    if (!isNaN(qty)) {
      onManualAllocate(order.id, qty);
    }
  };

  const getOrderTypeTag = () => {
    let color = 'bg-gray-600';
    if (order.order_type === OrderType.EMERGENCY) {
      color = 'bg-red-600';
    } else if (order.order_type === OrderType.OVER_DUE) {
      color = 'bg-orange-500';
    } else if (order.order_type === OrderType.NEW) {
      color = 'bg-blue-600';
    }
    return (
      <span className={`ml-2 px-2 py-1 ${color} text-white text-xs font-semibold rounded-full uppercase`}>
        {order.order_type.toUpperCase().replace('_', ' ')}
      </span>
    );
  };

  const formattedCustomerCredit = new Intl.NumberFormat('en-US').format(customerCredit);
  const formattedCustomerClosing = new Intl.NumberFormat('en-US').format(customerClosing);
  const formattedProductPrice = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(productPrice);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 font-inter text-gray-800">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold">ORDER-{order.id}</h2>
        {getOrderTypeTag()}
      </div>

      <hr className="my-4 border-gray-200" />

      <div className="grid grid-cols-3 gap-y-4">
        <div className="col-span-1">
          <p className="text-sm text-gray-500">Customer</p>
          <p className="text-base font-semibold">{customerName}</p>
        </div>
        <div className="col-span-1">
          <p className="text-sm text-gray-500">Credit Remaining</p>
          <p className="text-base font-semibold">{customerCredit - customerClosing} THB</p>
        </div>
        <div className="col-span-1">
          <p className="text-sm text-gray-500">Closing</p>
          <p className="text-base font-semibold">{customerClosing} THB</p>
        </div>

        <div className="col-span-1">
          <p className="text-sm text-gray-500">Product</p>
          <p className="text-base font-semibold">{productName}</p>
        </div>
        <div className="col-span-1">
          <p className="text-sm text-gray-500">Remark</p>
          <p className="text-base font-semibold">1 day delivery Product</p>
        </div>
        <div className="col-span-1">
          <p className="text-sm text-gray-500">Suggestion</p>
          {/* Suggestion แสดงค่าจาก auto allocation เท่านั้น */}
          <p className="text-base font-semibold">{order.suggested_qty} Unit</p>
        </div>

        <div className="col-span-1">
          <p className="text-sm text-gray-500">Price Per Unit</p>
          <p className="text-base font-semibold">{productPrice} THB</p>
        </div>
        <div className="col-span-1">
          <p className="text-sm text-gray-500">Request Qty</p>
          <p className="text-base font-semibold">{order.quantity} Unit</p>
        </div>
        <div className="col-span-1 flex flex-col">
          <label htmlFor={`qty-${order.id}`} className="text-sm text-gray-500">
            Qty
          </label>
          <input
            id={`qty-${order.id}`}
            type="number"
            value={order.allocated_qty}
            onChange={handleInputChange}
            max={order.quantity}
            min="0"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

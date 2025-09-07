import React from 'react';
import type { FC } from 'react';
import { OrderType } from '../mockData';

interface OrderCardProps {
  order: any;
  onManualAllocate: (orderId: string, request_qty: number) => void;
  customerName: string;
  productName: string;
  customerCredit: number;
  productPrice: number;
  customerClosing: number;
}

const OrderCard: FC<OrderCardProps> = ({ order, onManualAllocate, customerName, productName, customerCredit, productPrice, customerClosing }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const qty = value === '' ? 0 : parseInt(value, 10);
    if (!isNaN(qty)) {
      onManualAllocate(order.id, qty);
    }
  };

  const getOrderTypeTag = () => {
    let color = 'bg-gray-600';
    if (order.order_type === OrderType.EMERGENCY) {
      color = 'bg-[#FF2424]';
    } else if (order.order_type === OrderType.OVER_DUE) {
      color = 'bg-[#FFB647]';
    } else if (order.order_type === OrderType.NEW) {
      color = 'bg-black';
    }
    return (
      <span className={`px-2 py-1 ${color} text-white text-xs font-bold rounded-full uppercase`}>
        {order.order_type.toUpperCase().replace('_', ' ')}
      </span>
    );
  };

  const formattedCreditRemaining = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(customerCredit - customerClosing);

  const formattedClosing = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(customerClosing);

    const formattedPricePerUnit = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(productPrice);


  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-4 text-black font-medium">
      <div className="flex  flex-col items-start mb-4">
        <h2 className="text-base md:text-xl font-semibold">ORDER-{order.id}</h2>
        {getOrderTypeTag()}
      </div>

      <div className="grid grid-cols-3 pb-3 my-3 border-b border-gray-200 gap-4">
        <div className="col-span-1">
          <p className="text-xs md:text-sm text-gray-500">Customer</p>
          <p className="text-base font-semibold">{customerName}</p>
        </div>
        <div className="col-span-1">
          <p className="text-xs md:text-sm text-gray-500">Credit Remaining</p>
          <p className="text-base font-semibold">{formattedCreditRemaining} THB</p>
        </div>
        <div className="col-span-1">
          <p className="text-xs md:text-sm text-gray-500">Closing</p>
          <p className="text-base font-semibold">{formattedClosing} THB</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <p className="text-xs md:text-sm text-gray-500">Product</p>
          <p className="text-base font-semibold">{productName}</p>
        </div>
        <div className="col-span-1">
          <p className="text-xs md:text-sm text-gray-500">Remark</p>
          <p className="text-sm md:text-base font-semibold">1 day delivery Product</p>
        </div>
        <div className="col-span-1">
          <p className="text-xs md:text-sm text-gray-500">Suggestion</p>
          <p className="text-base font-semibold">{order.suggested_qty} Unit</p>
        </div>

        <div className="col-span-1">
          <p className="text-xs md:text-sm text-gray-500">Price Per Unit</p>
          <p className="text-base font-semibold">{formattedPricePerUnit} THB</p>
        </div>
        <div className="col-span-1">
          <p className="text-xs md:text-sm text-gray-500">Request Qty</p>
          <p className="text-base font-semibold">{order.request_qty} Unit</p>
        </div>
        <div className="col-span-1 flex flex-col">
          <label htmlFor={`qty-${order.id}`} className="text-xs md:text-sm text-gray-500">
            Qty
          </label>
          <div className='flex flex-row items-center'>
            <input
              id={`qty-${order.id}`}
              type="number"
              value={order.allocated_qty}
              onChange={handleInputChange}
              max={order.request_qty}
              min="0"
              className="w-[50px] mt-1 p-1 border-b border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> 
            <p className="text-base font-semibold"> Unit</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

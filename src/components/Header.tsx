import React from 'react';
import type { FC } from 'react';

interface HeaderProps {
  totalStock: number;
  totalPrice: number;
}

const Header: FC<HeaderProps> = ({ totalStock, totalPrice }) => {
  const formattedTotalPrice = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalPrice);

  const stockColor = totalStock <= 0 ? '#ef4444' : totalStock <= 300 ? '#f59e0b' : '#22c55e';

  return (
    <div className="text-xl font-semibold text-gray-700">
      Salmon <span className="text-2xl font-bold text-gray-900">{totalStock}</span> Unit
      <span className="ml-8">Total</span> <span className="text-2xl font-bold text-gray-900">{formattedTotalPrice}</span> THB
    </div>
  );
};

export default Header;
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
  
  const formattedTotalStock = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalStock);


  return (
    <div className="text-xl font-semibold text-gray-700">
      Salmon <span className="text-2xl font-bold text-gray-900">{formattedTotalStock}</span> Unit
      <span className="ml-8">Total</span> <span className="text-2xl font-bold text-gray-900">{formattedTotalPrice}</span> THB
    </div>
  );
};

export default Header;
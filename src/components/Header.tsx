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
    <div className="flex flex-col gap-1 justify-between text-xl font-medium text-black md:flex-row">
      <div className="flex flex-row gap-[10px]">Salmon <span>{formattedTotalStock}</span> Unit</div>
      <div className="flex flex-row gap-[10px]">Total <span>{formattedTotalPrice}</span> THB</div>
    </div>
  );
};

export default Header;
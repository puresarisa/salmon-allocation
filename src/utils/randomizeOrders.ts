import type { Order} from "../mockData";
import { products, OrderType as OrderTypeEnum } from "../mockData";

export function getRandomizedOrders(orders: Order[]): Order[] {
  const newOrders = JSON.parse(JSON.stringify(orders)) as Order[];
  for (let i = 0; i < 3; i++) {
    const idx = Math.floor(Math.random() * newOrders.length);
    newOrders[idx].request_qty = Math.max(
      1,
      newOrders[idx].request_qty + Math.floor(Math.random() * 40 - 20)
    );
    if (Math.random() > 0.5) {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      newOrders[idx].product_id = randomProduct.id;
    }
    if (Math.random() > 0.5) {
      const orderTypes = Object.values(OrderTypeEnum);
      newOrders[idx].order_type = orderTypes[Math.floor(Math.random() * orderTypes.length)];
    }
    if (Math.random() > 0.5) {
      const randomDays = Math.floor(Math.random() * 30);
      const baseDate = new Date(newOrders[idx].order_date);
      baseDate.setDate(baseDate.getDate() + randomDays);
      newOrders[idx].order_date = baseDate.toISOString();
    }
  }
  return newOrders;
}
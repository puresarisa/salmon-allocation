import type { Order, Product, Customer } from "../mockData";
import { OrderType } from "../mockData";

export function allocateOrders(
  sourceOrders: Order[],
  products: Product[],
  customers: Customer[],
  initialStock: number,
  orderPriority: Record<OrderType, number>
): Order[] {
  const customerCredits: Record<string, number> = {};
  customers.forEach((c) => {
    customerCredits[c.id] = c.credit_limit;
  });

  let currentStock = initialStock;
  const tempOrders: Order[] = JSON.parse(JSON.stringify(sourceOrders));

  // Sort orders: oldest first, then by priority
  const sortedOrders = [...tempOrders].sort((a, b) => {
    const dateA = new Date(a.order_date).getTime();
    const dateB = new Date(b.order_date).getTime();
    if (dateA !== dateB) return dateA - dateB;
    const priorityA = orderPriority[a.order_type];
    const priorityB = orderPriority[b.order_type];
    return priorityA - priorityB;
  });

  // First Pass: Fair Allocation - give at least one item to each customer if possible
  sortedOrders.forEach(order => order.allocated_qty = 0);

  const customersWithOrders = [...new Set(sortedOrders.map((order: Order) => order.customer_id))];

  for (const customerId of customersWithOrders) {
    const firstOrder = sortedOrders.find((order: Order) => order.customer_id === customerId);
    if (firstOrder) {
      const product = products.find(p => p.id === firstOrder.product_id);
      const price = product?.price[firstOrder.order_type] ?? 0;
      if (currentStock > 0 && customerCredits[customerId] >= price) {
        firstOrder.allocated_qty = 1;
        currentStock -= 1;
        customerCredits[customerId] -= price;
      }
    }
  }

  // Second Pass: Allocate the rest based on sorted order
  const allocatedOrders = sortedOrders.map((order: Order) => {
    let allocated_qty = order.allocated_qty || 0;
    if (currentStock > 0) {
      const product = products.find((p) => p.id === order.product_id);
      const customer = customers.find((c) => c.id === order.customer_id);

      if (product && customer) {
        const price = product.price[order.order_type] ?? 0;
        const maxByRequest = order.request_qty - allocated_qty;
        const maxByStock = currentStock;
        const maxByCredit = Math.floor(customerCredits[customer.id] / price);

        const allocationAmount = Math.min(maxByRequest, maxByStock, maxByCredit);

        if (allocationAmount > 0) {
          allocated_qty += allocationAmount;
          currentStock -= allocationAmount;
          customerCredits[customer.id] -= allocationAmount * price;

          if (customerCredits[customer.id] < 0) {
            const overAllocated = Math.ceil(Math.abs(customerCredits[customer.id]) / price);
            allocated_qty -= overAllocated;
            currentStock += overAllocated;
            customerCredits[customer.id] = 0;
          }
        }
      }
    }

    return { ...order, allocated_qty, suggested_qty: allocated_qty };
  });

  return allocatedOrders;
}
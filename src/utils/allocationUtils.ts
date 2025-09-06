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
        const maxByRequest = order.request_qty - allocated_qty;
        const maxByStock = currentStock;
        const maxByCredit = Math.floor(customerCredits[customer.id] / product.price);

        const allocationAmount = Math.min(maxByRequest, maxByStock, maxByCredit);

        if (allocationAmount > 0) {
          allocated_qty += allocationAmount;
          currentStock -= allocationAmount;
          customerCredits[customer.id] -= allocationAmount * product.price;

          if (customerCredits[customer.id] < 0) {
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

  return sortedForDisplay;
}
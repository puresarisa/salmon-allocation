export const OrderType = {
  EMERGENCY: 'emergency',
  OVER_DUE: 'over_due',
  STANDARD: 'standard',
  NEW: 'new',
} as const;

export type OrderType = typeof OrderType[keyof typeof OrderType];

export interface Customer {
  id: string;
  name: string;
  credit_limit: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Order {
  id: string;
  customer_id: string;
  product_id: string;
  quantity: number;
  allocated_qty: number; // For tracking allocated units
  order_date: string;
  order_type: OrderType;
  // A helper property to hold the original request quantity
  requested_qty: number;
}

export const orders: Order[] = [
  { id: "1001", customer_id: "C1", product_id: "P1", quantity: 60,  allocated_qty: 0, order_date: "2024-04-23T10:00:00Z", order_type: OrderType.NEW,       requested_qty: 60 },
  { id: "1002", customer_id: "C2", product_id: "P1", quantity: 80,  allocated_qty: 0, order_date: "2024-04-22T12:00:00Z", order_type: OrderType.NEW,       requested_qty: 80 },
  { id: "1003", customer_id: "C3", product_id: "P1", quantity: 120, allocated_qty: 0, order_date: "2024-04-21T14:00:00Z", order_type: OrderType.NEW,       requested_qty: 120 },
  { id: "1004", customer_id: "C1", product_id: "P2", quantity: 40,  allocated_qty: 0, order_date: "2024-04-20T16:00:00Z", order_type: OrderType.NEW,       requested_qty: 40 },
  { id: "1005", customer_id: "C2", product_id: "P1", quantity: 150, allocated_qty: 0, order_date: "2024-04-19T18:00:00Z", order_type: OrderType.EMERGENCY, requested_qty: 150 },
  { id: "1006", customer_id: "C4", product_id: "P1", quantity: 75,  allocated_qty: 0, order_date: "2024-04-18T20:00:00Z", order_type: OrderType.STANDARD,  requested_qty: 75 },
  { id: "1007", customer_id: "C5", product_id: "P1", quantity: 100, allocated_qty: 0, order_date: "2024-04-17T22:00:00Z", order_type: OrderType.EMERGENCY, requested_qty: 100 },
  { id: "1008", customer_id: "C6", product_id: "P2", quantity: 90,  allocated_qty: 0, order_date: "2024-04-16T10:00:00Z", order_type: OrderType.STANDARD,  requested_qty: 90 },
  { id: "1009", customer_id: "C7", product_id: "P2", quantity: 200, allocated_qty: 0, order_date: "2024-04-15T12:00:00Z", order_type: OrderType.EMERGENCY, requested_qty: 200 },
  { id: "1010", customer_id: "C8", product_id: "P2", quantity: 50,  allocated_qty: 0, order_date: "2024-04-14T14:00:00Z", order_type: OrderType.STANDARD,  requested_qty: 50 },
  { id: "1011", customer_id: "C9", product_id: "P2",quantity: 110, allocated_qty: 0, order_date: "2024-04-13T16:00:00Z", order_type: OrderType.EMERGENCY, requested_qty: 110 },
  { id: "1012", customer_id: "C1", product_id: "P2", quantity: 30,  allocated_qty: 0, order_date: "2024-04-12T18:00:00Z", order_type: OrderType.STANDARD,  requested_qty: 30 },
  { id: "1013", customer_id: "C1", product_id: "P1", quantity: 180, allocated_qty: 0, order_date: "2024-04-11T20:00:00Z", order_type: OrderType.OVER_DUE,   requested_qty: 180 },
  { id: "1014", customer_id: "C2", product_id: "P1", quantity: 95,  allocated_qty: 0, order_date: "2024-04-10T22:00:00Z", order_type: OrderType.OVER_DUE,   requested_qty: 95 },
  { id: "1015", customer_id: "C3", product_id: "P1", quantity: 250, allocated_qty: 0, order_date: "2024-04-09T10:00:00Z", order_type: OrderType.OVER_DUE,   requested_qty: 250 },
    { id: "1051", customer_id: "C1", product_id: "P1", quantity: 60,  allocated_qty: 0, order_date: "2024-04-23T10:00:00Z", order_type: OrderType.NEW,       requested_qty: 60 },
  { id: "1052", customer_id: "C2", product_id: "P1", quantity: 80,  allocated_qty: 0, order_date: "2024-04-22T12:00:00Z", order_type: OrderType.NEW,       requested_qty: 80 },
  { id: "1053", customer_id: "C3", product_id: "P1", quantity: 120, allocated_qty: 0, order_date: "2024-04-21T14:00:00Z", order_type: OrderType.NEW,       requested_qty: 120 },
  { id: "1054", customer_id: "C1", product_id: "P2", quantity: 40,  allocated_qty: 0, order_date: "2024-04-20T16:00:00Z", order_type: OrderType.NEW,       requested_qty: 40 },
  { id: "1055", customer_id: "C2", product_id: "P1", quantity: 150, allocated_qty: 0, order_date: "2024-04-19T18:00:00Z", order_type: OrderType.EMERGENCY, requested_qty: 150 },
  { id: "1056", customer_id: "C4", product_id: "P1", quantity: 75,  allocated_qty: 0, order_date: "2024-04-18T20:00:00Z", order_type: OrderType.STANDARD,  requested_qty: 75 },
  { id: "1057", customer_id: "C5", product_id: "P1", quantity: 100, allocated_qty: 0, order_date: "2024-04-17T22:00:00Z", order_type: OrderType.EMERGENCY, requested_qty: 100 },
  { id: "1058", customer_id: "C6", product_id: "P2", quantity: 90,  allocated_qty: 0, order_date: "2024-04-16T10:00:00Z", order_type: OrderType.STANDARD,  requested_qty: 90 },
  { id: "1059", customer_id: "C7", product_id: "P2", quantity: 200, allocated_qty: 0, order_date: "2024-04-15T12:00:00Z", order_type: OrderType.EMERGENCY, requested_qty: 200 },
  { id: "1510", customer_id: "C8", product_id: "P2", quantity: 50,  allocated_qty: 0, order_date: "2024-04-14T14:00:00Z", order_type: OrderType.STANDARD,  requested_qty: 50 },
  { id: "1511", customer_id: "C9", product_id: "P2",quantity: 110, allocated_qty: 0, order_date: "2024-04-13T16:00:00Z", order_type: OrderType.EMERGENCY, requested_qty: 110 },
  { id: "1512", customer_id: "C1", product_id: "P2", quantity: 30,  allocated_qty: 0, order_date: "2024-04-12T18:00:00Z", order_type: OrderType.STANDARD,  requested_qty: 30 },
  { id: "1513", customer_id: "C1", product_id: "P1", quantity: 180, allocated_qty: 0, order_date: "2024-04-11T20:00:00Z", order_type: OrderType.OVER_DUE,   requested_qty: 180 },
  { id: "1514", customer_id: "C2", product_id: "P1", quantity: 95,  allocated_qty: 0, order_date: "2024-04-10T22:00:00Z", order_type: OrderType.OVER_DUE,   requested_qty: 95 },
  { id: "1515", customer_id: "C3", product_id: "P1", quantity: 250, allocated_qty: 0, order_date: "2024-04-09T10:00:00Z", order_type: OrderType.OVER_DUE,   requested_qty: 250 },
];

export const products: Product[] = [
  { id: "P1", name: "Salmon A", price: 515.75 },
  { id: "P2", name: "Salmon B", price: 600.00 },
];

export const customers: Customer[] = [
  { id: "C1", name: "Alice", credit_limit: 5000 },
  { id: "C2", name: "Bob", credit_limit: 4000 },
  { id: "C3", name: "Charlie", credit_limit: 3000 },
  { id: "C4", name: "Diana", credit_limit: 2500 },
  { id: "C5", name: "Eve", credit_limit: 6000 },
  { id: "C6", name: "Frank", credit_limit: 3500 },
  { id: "C7", name: "Grace", credit_limit: 7000 },
  { id: "C8", name: "Henry", credit_limit: 2800 },
  { id: "C9", name: "Ivy", credit_limit: 3200 },
  { id: "C10", name: "Jack", credit_limit: 2600 },
];

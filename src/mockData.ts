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
  allocated_qty: number; 
  order_date: string;
  order_type: OrderType;
  requested_qty: number;
}

export const products: Product[] = [
  { id: "P1", name: "Salmon A", price: 515.75 },
  { id: "P2", name: "Salmon B", price: 750.00 },
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

export const orders: Order[] = [
  { id: "1001", customer_id: "C4", product_id: "P2", quantity: 200, allocated_qty: 0, order_date: "2024-01-01T10:00:00Z", order_type: OrderType.OVER_DUE, requested_qty: 200 },
  { id: "1002", customer_id: "C8", product_id: "P2", quantity: 95,  allocated_qty: 0, order_date: "2024-01-02T10:00:00Z", order_type: OrderType.OVER_DUE, requested_qty: 95 },
  { id: "1003", customer_id: "C6", product_id: "P2", quantity: 65,  allocated_qty: 0, order_date: "2024-01-03T10:00:00Z", order_type: OrderType.OVER_DUE, requested_qty: 65 },
  { id: "1004", customer_id: "C10", product_id: "P2", quantity: 240, allocated_qty: 0, order_date: "2024-01-04T10:00:00Z", order_type: OrderType.OVER_DUE, requested_qty: 240 },
  { id: "1005", customer_id: "C2", product_id: "P2", quantity: 210, allocated_qty: 0, order_date: "2024-01-05T10:00:00Z", order_type: OrderType.OVER_DUE, requested_qty: 210 },
  { id: "1006", customer_id: "C3", product_id: "P1", quantity: 90,  allocated_qty: 0, order_date: "2024-01-06T10:00:00Z", order_type: OrderType.STANDARD, requested_qty: 90 },
  { id: "1007", customer_id: "C7", product_id: "P1", quantity: 180, allocated_qty: 0, order_date: "2024-01-07T10:00:00Z", order_type: OrderType.STANDARD, requested_qty: 180 },
  { id: "1008", customer_id: "C1", product_id: "P1", quantity: 140, allocated_qty: 0, order_date: "2024-01-08T10:00:00Z", order_type: OrderType.STANDARD, requested_qty: 140 },
  { id: "1009", customer_id: "C5", product_id: "P1", quantity: 150, allocated_qty: 0, order_date: "2024-01-09T10:00:00Z", order_type: OrderType.STANDARD, requested_qty: 150 },
  { id: "1010", customer_id: "C9", product_id: "P1", quantity: 160, allocated_qty: 0, order_date: "2024-01-10T10:00:00Z", order_type: OrderType.STANDARD, requested_qty: 160 },
  { id: "1011", customer_id: "C2", product_id: "P2", quantity: 120, allocated_qty: 0, order_date: "2024-01-11T10:00:00Z", order_type: OrderType.EMERGENCY, requested_qty: 120 },
  { id: "1012", customer_id: "C6", product_id: "P2", quantity: 70,  allocated_qty: 0, order_date: "2024-01-12T10:00:00Z", order_type: OrderType.EMERGENCY, requested_qty: 70 },
  { id: "1013", customer_id: "C10", product_id: "P2", quantity: 85,  allocated_qty: 0, order_date: "2024-01-13T10:00:00Z", order_type: OrderType.EMERGENCY, requested_qty: 85 },
  { id: "1014", customer_id: "C4", product_id: "P2", quantity: 100, allocated_qty: 0, order_date: "2024-01-14T10:00:00Z", order_type: OrderType.EMERGENCY, requested_qty: 100 },
  { id: "1015", customer_id: "C8", product_id: "P2", quantity: 75,  allocated_qty: 0, order_date: "2024-01-15T10:00:00Z", order_type: OrderType.EMERGENCY, requested_qty: 75 },
  { id: "1016", customer_id: "C1", product_id: "P1", quantity: 60,  allocated_qty: 0, order_date: "2024-02-01T10:00:00Z", order_type: OrderType.NEW, requested_qty: 60 },
  { id: "1017", customer_id: "C3", product_id: "P1", quantity: 50,  allocated_qty: 0, order_date: "2024-02-02T10:00:00Z", order_type: OrderType.NEW, requested_qty: 50 },
  { id: "1018", customer_id: "C5", product_id: "P1", quantity: 170, allocated_qty: 0, order_date: "2024-02-03T10:00:00Z", order_type: OrderType.NEW, requested_qty: 170 },
  { id: "1019", customer_id: "C7", product_id: "P1", quantity: 220, allocated_qty: 0, order_date: "2024-02-04T10:00:00Z", order_type: OrderType.NEW, requested_qty: 220 },
  { id: "1020", customer_id: "C9", product_id: "P1", quantity: 130, allocated_qty: 0, order_date: "2024-02-05T10:00:00Z", order_type: OrderType.NEW, requested_qty: 130 },
  { id: "1021", customer_id: "C2", product_id: "P2", quantity: 60,  allocated_qty: 0, order_date: "2024-01-16T10:00:00Z", order_type: OrderType.EMERGENCY, requested_qty: 60 },
  { id: "1022", customer_id: "C4", product_id: "P2", quantity: 90,  allocated_qty: 0, order_date: "2024-01-17T10:00:00Z", order_type: OrderType.OVER_DUE, requested_qty: 90 },
  { id: "1023", customer_id: "C6", product_id: "P2", quantity: 130, allocated_qty: 0, order_date: "2024-01-18T10:00:00Z", order_type: OrderType.EMERGENCY, requested_qty: 130 },
  { id: "1024", customer_id: "C8", product_id: "P2", quantity: 150, allocated_qty: 0, order_date: "2024-01-19T10:00:00Z", order_type: OrderType.OVER_DUE, requested_qty: 150 },
  { id: "1025", customer_id: "C10", product_id: "P2", quantity: 170, allocated_qty: 0, order_date: "2024-01-20T10:00:00Z", order_type: OrderType.EMERGENCY, requested_qty: 170 },
  { id: "1026", customer_id: "C1", product_id: "P1", quantity: 100, allocated_qty: 0, order_date: "2024-02-06T10:00:00Z", order_type: OrderType.NEW, requested_qty: 100 },
  { id: "1027", customer_id: "C3", product_id: "P1", quantity: 180, allocated_qty: 0, order_date: "2024-02-07T10:00:00Z", order_type: OrderType.NEW, requested_qty: 180 },
  { id: "1028", customer_id: "C5", product_id: "P1", quantity: 210, allocated_qty: 0, order_date: "2024-02-08T10:00:00Z", order_type: OrderType.NEW, requested_qty: 210 },
  { id: "1029", customer_id: "C7", product_id: "P1", quantity: 75,  allocated_qty: 0, order_date: "2024-02-09T10:00:00Z", order_type: OrderType.NEW, requested_qty: 75 },
  { id: "1030", customer_id: "C9", product_id: "P1", quantity: 95,  allocated_qty: 0, order_date: "2024-02-10T10:00:00Z", order_type: OrderType.NEW, requested_qty: 95 },
];


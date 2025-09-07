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
  price: {
    emergency: number;
    over_due: number;
    standard: number;
    new: number;
  };
}

export interface Order {
  id: string;
  customer_id: string;
  product_id: string;
  request_qty: number;
  allocated_qty: number; 
  order_date: string;
  order_type: OrderType;
}

export const products: Product[] = [
  {
    id: "P1",
    name: "Salmon A",
    price: {
      emergency: 750.00,
      over_due: 515.75,
      standard: 515.75,
      new: 515.75,
    },
  },
  {
    id: "P2",
    name: "Salmon B",
    price: {
      emergency: 700.00,
      over_due: 550.00,
      standard: 550.00,
      new: 550.00,
    },
  },
];

export const customers: Customer[] = [
  { id: "C1", name: "Alice", credit_limit: 12000 },
  { id: "C2", name: "Bob", credit_limit: 8000 },
  { id: "C3", name: "Charlie", credit_limit: 15000 },
  { id: "C4", name: "Diana", credit_limit: 5000 },
  { id: "C5", name: "Eve", credit_limit: 20000 },
  { id: "C6", name: "Frank", credit_limit: 7000 },
  { id: "C7", name: "Grace", credit_limit: 18000 },
  { id: "C8", name: "Henry", credit_limit: 9000 },
  { id: "C9", name: "Ivy", credit_limit: 10000 },
  { id: "C10", name: "Jack", credit_limit: 6000 },
  { id: "C11", name: "Kelly", credit_limit: 11000 },
  { id: "C12", name: "Leo", credit_limit: 9500 },
  { id: "C13", name: "Mia", credit_limit: 16000 },
  { id: "C14", name: "Noah", credit_limit: 4500 },
  { id: "C15", name: "Olivia", credit_limit: 22000 },
  { id: "C16", name: "Peter", credit_limit: 7500 },
  { id: "C17", name: "Quinn", credit_limit: 19000 },
  { id: "C18", name: "Rachel", credit_limit: 8500 },
  { id: "C19", name: "Sam", credit_limit: 13000 },
  { id: "C20", name: "Tina", credit_limit: 6500 },
];

export const orders: Order[] = [
  { id: "001", customer_id: "C14", product_id: "P2", request_qty: 55, allocated_qty: 0, order_date: "2025-01-03T10:00:00Z", order_type: OrderType.OVER_DUE },
  { id: "002", customer_id: "C18", product_id: "P2", request_qty: 60, allocated_qty: 0, order_date: "2025-01-07T10:00:00Z", order_type: OrderType.OVER_DUE },
  { id: "003", customer_id: "C16", product_id: "P2", request_qty: 35, allocated_qty: 0, order_date: "2025-01-12T10:00:00Z", order_type: OrderType.OVER_DUE },
  { id: "004", customer_id: "C10", product_id: "P2", request_qty: 45, allocated_qty: 0, order_date: "2025-01-14T10:00:00Z", order_type: OrderType.OVER_DUE },
  { id: "005", customer_id: "C2", product_id: "P2", request_qty: 50, allocated_qty: 0, order_date: "2025-01-25T10:00:00Z", order_type: OrderType.OVER_DUE },
  { id: "006", customer_id: "C13", product_id: "P1", request_qty: 75, allocated_qty: 0, order_date: "2025-01-07T10:00:00Z", order_type: OrderType.EMERGENCY },
  { id: "007", customer_id: "C7", product_id: "P1", request_qty: 80, allocated_qty: 0, order_date: "2025-01-25T10:00:00Z", order_type: OrderType.EMERGENCY },
  { id: "008", customer_id: "C11", product_id: "P1", request_qty: 40, allocated_qty: 0, order_date: "2025-02-02T10:00:00Z", order_type: OrderType.OVER_DUE },
  { id: "009", customer_id: "C5", product_id: "P1", request_qty: 60, allocated_qty: 0, order_date: "2025-02-05T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "010", customer_id: "C9", product_id: "P1", request_qty: 30, allocated_qty: 0, order_date: "2025-02-09T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "011", customer_id: "C12", product_id: "P2", request_qty: 40, allocated_qty: 0, order_date: "2025-02-12T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "012", customer_id: "C6", product_id: "P2", request_qty: 60, allocated_qty: 0, order_date: "2025-02-15T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "013", customer_id: "C10", product_id: "P2", request_qty: 35, allocated_qty: 0, order_date: "2025-02-18T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "014", customer_id: "C4", product_id: "P2", request_qty: 65, allocated_qty: 0, order_date: "2025-02-15T10:00:00Z", order_type: OrderType.EMERGENCY },
  { id: "015", customer_id: "C15", product_id: "P2", request_qty: 40, allocated_qty: 0, order_date: "2025-02-24T10:00:00Z", order_type: OrderType.EMERGENCY },
  { id: "016", customer_id: "C1", product_id: "P1", request_qty: 25, allocated_qty: 0, order_date: "2025-03-01T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "017", customer_id: "C3", product_id: "P1", request_qty: 35, allocated_qty: 0, order_date: "2025-03-04T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "018", customer_id: "C19", product_id: "P1", request_qty: 40, allocated_qty: 0, order_date: "2025-03-07T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "019", customer_id: "C7", product_id: "P1", request_qty: 20, allocated_qty: 0, order_date: "2025-03-10T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "020", customer_id: "C9", product_id: "P1", request_qty: 15, allocated_qty: 0, order_date: "2025-03-13T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "021", customer_id: "C2", product_id: "P2", request_qty: 30, allocated_qty: 0, order_date: "2025-03-16T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "022", customer_id: "C4", product_id: "P2", request_qty: 40, allocated_qty: 0, order_date: "2025-03-19T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "023", customer_id: "C6", product_id: "P2", request_qty: 35, allocated_qty: 0, order_date: "2025-04-01T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "024", customer_id: "C8", product_id: "P2", request_qty: 20, allocated_qty: 0, order_date: "2025-04-04T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "025", customer_id: "C20", product_id: "P2", request_qty: 40, allocated_qty: 0, order_date: "2025-04-07T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "026", customer_id: "C1", product_id: "P1", request_qty: 30, allocated_qty: 0, order_date: "2025-04-10T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "027", customer_id: "C3", product_id: "P1", request_qty: 20, allocated_qty: 0, order_date: "2025-04-13T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "028", customer_id: "C5", product_id: "P1", request_qty: 15, allocated_qty: 0, order_date: "2025-04-16T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "029", customer_id: "C17", product_id: "P1", request_qty: 25, allocated_qty: 0, order_date: "2025-05-01T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "030", customer_id: "C9", product_id: "P1", request_qty: 40, allocated_qty: 0, order_date: "2025-05-04T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "031", customer_id: "C2", product_id: "P2", request_qty: 35, allocated_qty: 0, order_date: "2025-05-07T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "032", customer_id: "C4", product_id: "P2", request_qty: 20, allocated_qty: 0, order_date: "2025-05-10T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "033", customer_id: "C6", product_id: "P2", request_qty: 40, allocated_qty: 0, order_date: "2025-05-13T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "034", customer_id: "C8", product_id: "P2", request_qty: 15, allocated_qty: 0, order_date: "2025-06-01T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "035", customer_id: "C10", product_id: "P2", request_qty: 25, allocated_qty: 0, order_date: "2025-06-04T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "036", customer_id: "C1", product_id: "P1", request_qty: 40, allocated_qty: 0, order_date: "2025-06-07T10:00:00Z", order_type: OrderType.STANDARD },
  { id: "037", customer_id: "C3", product_id: "P1", request_qty: 10, allocated_qty: 0, order_date: "2025-07-01T10:00:00Z", order_type: OrderType.NEW },
  { id: "038", customer_id: "C5", product_id: "P1", request_qty: 20, allocated_qty: 0, order_date: "2025-07-04T10:00:00Z", order_type: OrderType.NEW },
  { id: "039", customer_id: "C7", product_id: "P1", request_qty: 15, allocated_qty: 0, order_date: "2025-07-07T10:00:00Z", order_type: OrderType.NEW },
  { id: "040", customer_id: "C9", product_id: "P1", request_qty: 25, allocated_qty: 0, order_date: "2025-08-01T10:00:00Z", order_type: OrderType.NEW },
  { id: "041", customer_id: "C2", product_id: "P2", request_qty: 5, allocated_qty: 0, order_date: "2025-08-04T10:00:00Z", order_type: OrderType.NEW },
  { id: "042", customer_id: "C4", product_id: "P2", request_qty: 20, allocated_qty: 0, order_date: "2025-08-07T10:00:00Z", order_type: OrderType.NEW },
  { id: "043", customer_id: "C6", product_id: "P2", request_qty: 15, allocated_qty: 0, order_date: "2025-09-01T10:00:00Z", order_type: OrderType.NEW },
  { id: "044", customer_id: "C8", product_id: "P2", request_qty: 25, allocated_qty: 0, order_date: "2025-09-04T10:00:00Z", order_type: OrderType.NEW },
  { id: "045", customer_id: "C10", product_id: "P2", request_qty: 10, allocated_qty: 0, order_date: "2025-09-07T10:00:00Z", order_type: OrderType.NEW }
];


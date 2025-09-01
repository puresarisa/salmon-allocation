// Interfaces for the data to ensure type safety with TypeScript.
interface Customer {
  id: string;
  name: string;
  credit_limit: number;
}

interface Product {
  id: string;
  name: string;
  unit_price: number;
}

export const OrderType = {
  HIGH_PRIORITY: 'high_priority',
  STANDARD: 'standard',
} as const;

export type OrderType = typeof OrderType[keyof typeof OrderType];

interface Order {
  id: string;
  customer_id: string;
  product_id: string;
  quantity: number;
  order_date: string; // Use ISO 8601 format (YYYY-MM-DD)
  allocated_qty: number;
  order_type: OrderType;
}

// -----------------------------------------------------------
// MOCK DATA
// -----------------------------------------------------------

export const customers: Customer[] = [
  { id: 'cust_001', name: 'Stark Industries', credit_limit: 500 },
  { id: 'cust_002', name: 'Wayne Enterprises', credit_limit: 350 },
  { id: 'cust_003', name: 'LexCorp', credit_limit: 200 },
  { id: 'cust_004', name: 'Oscorp', credit_limit: 400 },
];

export const products: Product[] = [
  { id: 'prod_001', name: 'Fresh Atlantic Salmon', unit_price: 15.00 },
  { id: 'prod_002', name: 'Smoked Salmon', unit_price: 25.00 },
];

export const orders: Order[] = [
  {
    id: 'ord_001',
    customer_id: 'cust_001',
    product_id: 'prod_001',
    quantity: 100,
    order_date: '2025-08-25',
    allocated_qty: 0,
    order_type: OrderType.HIGH_PRIORITY,
  },
  {
    id: 'ord_002',
    customer_id: 'cust_002',
    product_id: 'prod_001',
    quantity: 150,
    order_date: '2025-08-26',
    allocated_qty: 0,
    order_type: OrderType.STANDARD,
  },
  {
    id: 'ord_003',
    customer_id: 'cust_003',
    product_id: 'prod_002',
    quantity: 50,
    order_date: '2025-08-27',
    allocated_qty: 0,
    order_type: OrderType.STANDARD,
  },
  {
    id: 'ord_004',
    customer_id: 'cust_001',
    product_id: 'prod_001',
    quantity: 200,
    order_date: '2025-08-28',
    allocated_qty: 0,
    order_type: OrderType.STANDARD,
  },
  {
    id: 'ord_005',
    customer_id: 'cust_004',
    product_id: 'prod_002',
    quantity: 120,
    order_date: '2025-08-29',
    allocated_qty: 0,
    order_type: OrderType.HIGH_PRIORITY,
  },
  {
    id: 'ord_006',
    customer_id: 'cust_002',
    product_id: 'prod_001',
    quantity: 80,
    order_date: '2025-08-30',
    allocated_qty: 0,
    order_type: OrderType.STANDARD,
  },
  {
    id: 'ord_007',
    customer_id: 'cust_003',
    product_id: 'prod_001',
    quantity: 90,
    order_date: '2025-08-31',
    allocated_qty: 0,
    order_type: OrderType.STANDARD,
  },
  {
    id: 'ord_008',
    customer_id: 'cust_004',
    product_id: 'prod_001',
    quantity: 110,
    order_date: '2025-09-01',
    allocated_qty: 0,
    order_type: OrderType.STANDARD,
  },
  {
    id: 'ord_009',
    customer_id: 'cust_001',
    product_id: 'prod_002',
    quantity: 75,
    order_date: '2025-09-02',
    allocated_qty: 0,
    order_type: OrderType.HIGH_PRIORITY,
  },
  {
    id: 'ord_010',
    customer_id: 'cust_002',
    product_id: 'prod_002',
    quantity: 130,
    order_date: '2025-09-03',
    allocated_qty: 0,
    order_type: OrderType.STANDARD,
  },
  {
    id: 'ord_011',
    customer_id: 'cust_003',
    product_id: 'prod_002',
    quantity: 60,
    order_date: '2025-09-04',
    allocated_qty: 0,
    order_type: OrderType.HIGH_PRIORITY,
  },
  {
    id: 'ord_012',
    customer_id: 'cust_004',
    product_id: 'prod_001',
    quantity: 140,
    order_date: '2025-09-05',
    allocated_qty: 0,
    order_type: OrderType.STANDARD,
  },
  {
    id: 'ord_013',
    customer_id: 'cust_001',
    product_id: 'prod_001',
    quantity: 180,
    order_date: '2025-09-06',
    allocated_qty: 0,
    order_type: OrderType.STANDARD,
  },
];

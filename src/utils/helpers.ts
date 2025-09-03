import { customers as mockCustomers, products as mockProducts } from '../mockData';

export const getCustomerName = (customerId: string) => mockCustomers.find(c => c.id === customerId)?.name || 'Unknown';

export const getProductName = (productId: string) => mockProducts.find(p => p.id === productId)?.name || 'Unknown';

export const getProductPrice = (productId: string) => mockProducts.find(p => p.id === productId)?.price || 0;

export const getCustomerCredit = (customerId: string) => mockCustomers.find(c => c.id === customerId)?.credit_limit || 0;


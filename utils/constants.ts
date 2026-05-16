export const API_BASE_URL: string = 'http://localhost:3030';

export const api_endpoints = {
  catalogue:      `${API_BASE_URL}/catalogue`,
  purchases:      `${API_BASE_URL}/purchases`,
  journalEntries: `${API_BASE_URL}/journalEntries`,
  generalLedger:  `${API_BASE_URL}/generalLedger`,
  contacts:       `${API_BASE_URL}/contacts`,
} as const;

export const app_routes = {
  home:          '/',
  catalogue:     '/Catalogue',
  inventory:     '/Inventory',
  inventoryList: '/InventoryList',
  reports:       '/Reports',
  contact:       '/ContactForm',
} as const;

export const nav_links = {
  home:          'Home',
  catalogue:     'Catalogue',
  inventory:     'Inventory',
  inventoryList: 'Inventory List',
  reports:       'Reports',
  contact:       'Contact Form',
} as const;

export const inventory_text = {
  purchased:    'purchased for',
  notPurchased: 'not purchased',
} as const;
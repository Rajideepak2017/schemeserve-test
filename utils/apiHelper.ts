import { APIRequestContext } from '@playwright/test';
import { api_endpoints }    from './constants.js';
import { CatalogueItem, PurchaseRecord, ContactRecord } from './types.js';

export async function getCatalogueItems(
  request: APIRequestContext
): Promise<CatalogueItem[]> {
  const response = await request.get(api_endpoints.catalogue);
  return (await response.json()) as CatalogueItem[];
}

export async function createPurchase(
  request:  APIRequestContext,
  item:     CatalogueItem,
  quantity: number
): Promise<PurchaseRecord> {
  const response = await request.post(api_endpoints.purchases, {
    data: {
      itemId:    String(item.id),
      itemName:  item.name,
      itemPrice: item.price,
      quantity:  String(quantity),
    },
  });
  return (await response.json()) as PurchaseRecord;
}

export async function deleteAllPurchases(
  request: APIRequestContext
): Promise<void> {
  const response  = await request.get(api_endpoints.purchases);
  const purchases = (await response.json()) as PurchaseRecord[];


  for (const purchase of purchases) {
    await request.delete(`${api_endpoints.purchases}/${purchase.id}`, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function createContact(
  request:     APIRequestContext,
  contactData: object
): Promise<ContactRecord> {
  const response = await request.post(api_endpoints.contacts, { data: contactData });
  return (await response.json()) as ContactRecord;
}

export async function deleteAllContacts(
  request: APIRequestContext
): Promise<void> {
  const response = await request.get(api_endpoints.contacts);
  const contacts = (await response.json()) as ContactRecord[];


  for (const contact of contacts) {
    await request.delete(`${api_endpoints.contacts}/${contact.id}`, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
import { APIRequestContext } from '@playwright/test';
import { api_endpoints }     from './constants.ts';
import { PurchaseRecord, ContactRecord } from './types.ts';

export async function createPurchase(
  request:  APIRequestContext,
  item:     { id: number; name: string; price: string },
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
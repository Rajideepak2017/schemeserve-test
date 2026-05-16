import { request } from '@playwright/test';
import { deleteAllPurchases, deleteAllContacts } from './apiHelper.ts';

export default async function globalSetup(): Promise<void> {
  const api_context = await request.newContext({
    baseURL: 'http://localhost:3030',
  });

  await deleteAllPurchases(api_context);
  await deleteAllContacts(api_context);

  await api_context.dispose();
}
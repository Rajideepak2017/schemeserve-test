import { test, expect }  from '../../fixtures/fixtures.ts';
import { api_endpoints } from '../../utils/constants.ts';
import catalogueData     from '../../test-data/catalogue.json' with { type: 'json' };
import contactsData      from '../../test-data/contacts.json'  with { type: 'json' };
import reportsData       from '../../test-data/reports.json'   with { type: 'json' };
import { CatalogueItem, ContactRecord, JournalEntry } from '../../utils/types.ts';

test('GET /catalogue — returns 200 with correct catalogue data', async ({ request }) => {
  const response       = await request.get(api_endpoints.catalogue);
  const catalogue_body = (await response.json()) as CatalogueItem[];

  expect(response.status()).toBe(200);
  expect(Array.isArray(catalogue_body)).toBe(true);
  expect(catalogue_body.length).toBe(10);

  for (const item of catalogue_body) {
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('name');
    expect(item).toHaveProperty('price');
    expect(item.price).toMatch(/^£\d+\.\d{2}$/);
  }

  expect(Number(catalogue_body[0].id)).toBe(1);
  expect(catalogue_body[0].name).toBe(catalogueData.firstItem.name);
  expect(catalogue_body[0].price).toBe(catalogueData.firstItem.price);
});

test('GET /journalEntries — returns 200 and filters by credit', async ({ request }) => {
  const all_response = await request.get(api_endpoints.journalEntries);
  const all_entries  = (await all_response.json()) as JournalEntry[];

  expect(all_response.status()).toBe(200);
  expect(all_entries.length).toBe(10);

  for (const entry of all_entries) {
    expect(entry).toHaveProperty('id');
    expect(entry).toHaveProperty('date');
    expect(entry).toHaveProperty('credit');
    expect(entry).toHaveProperty('debit');
    expect(entry).toHaveProperty('amount');
  }

  const credit_filter     = reportsData.searchTerm.charAt(0).toUpperCase() + reportsData.searchTerm.slice(1);
  const filtered_response = await request.get(`${api_endpoints.journalEntries}?credit=${credit_filter}`);
  const filtered_entries  = (await filtered_response.json()) as JournalEntry[];

  expect(filtered_response.status()).toBe(200);
  expect(filtered_entries.length).toBeGreaterThan(0);
  for (const entry of filtered_entries) {
    expect(entry.credit).toBe(credit_filter);
  }

  const empty_response = await request.get(`${api_endpoints.journalEntries}?credit=NONEXISTENT`);
  expect(empty_response.status()).toBe(200);
  expect(((await empty_response.json()) as JournalEntry[]).length).toBe(0);
});

test('POST /contacts — returns 201 and persists the contact', async ({ request }) => {
  const response  = await request.post(api_endpoints.contacts, { data: contactsData });
  const post_body = (await response.json()) as ContactRecord;

  expect(response.status()).toBe(201);
  expect(post_body).toHaveProperty('id');
  expect(post_body.firstName).toBe(contactsData.firstName);
  expect(post_body.lastName).toBe(contactsData.lastName);
  expect(post_body.agree).toBe(true);

  const get_response  = await request.get(api_endpoints.contacts);
  const contacts_list = (await get_response.json()) as ContactRecord[];
  const found_contact = contacts_list.find(c => c.id === post_body.id);

  expect(found_contact).toBeDefined();
  expect(found_contact!.firstName).toBe(contactsData.firstName);
});

test('GET /contacts — returns 200 with correct schema', async ({ request }) => {
  await request.post(api_endpoints.contacts, { data: contactsData });

  const response      = await request.get(api_endpoints.contacts);
  const contacts_body = (await response.json()) as ContactRecord[];

  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');
  expect(Array.isArray(contacts_body)).toBe(true);
  expect(contacts_body.length).toBeGreaterThan(0);

  for (const contact of contacts_body) {
    expect(contact).toHaveProperty('id');
    expect(contact).toHaveProperty('firstName');
    expect(contact).toHaveProperty('lastName');
    expect(contact).toHaveProperty('agree');
    expect(typeof contact.firstName).toBe('string');
    expect(typeof contact.lastName).toBe('string');
    expect(typeof contact.agree).toBe('boolean');
  }
});
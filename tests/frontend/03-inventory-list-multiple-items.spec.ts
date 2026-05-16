import { test, expect }   from '../../fixtures/fixtures.ts';
import { createPurchase } from '../../utils/apiHelper.ts';
import catalogueData      from '../../test-data/catalogue.json' with { type: 'json' };

const purchased_items = [
  { item: catalogueData.firstItem,  quantity: catalogueData.purchaseQuantity },
  { item: catalogueData.secondItem, quantity: catalogueData.secondQuantity },
];

test.beforeAll(async ({ request }) => {
  for (const { item, quantity } of purchased_items) {
    await createPurchase(request, item, quantity);
  }
});

test('Inventory List displays all purchased items', async ({
  page,
  inventoryListPage,
}) => {

  await page.goto('/');
  await inventoryListPage.navigate();
  await inventoryListPage.waitForPageLoad();

  await expect(inventoryListPage.page_heading).toBeVisible();

  for (const { item } of purchased_items) {
    await expect(
      inventoryListPage.getPurchasedItemButton(item.name)
    ).toBeVisible();
  }
});
import { test, expect }                      from '../../fixtures/fixtures.ts';
import { createPurchase, deleteAllPurchases } from '../../utils/apiHelper.ts';
import catalogueData from '../../test-data/catalogue.json' with { type: 'json' };

test.describe('Inventory — remove quantity', () => {

  test.beforeAll(async ({ request }) => {
    await createPurchase(request, catalogueData.firstItem, catalogueData.purchaseQuantity);
  });

  test.afterAll(async ({ request }) => {
    await deleteAllPurchases(request);
  });

  test('Remove quantity and verify Inventory reflects change', async ({
    page,
    inventoryPage,
  }) => {

    const item_name    = catalogueData.firstItem.name;
    const expected_qty = catalogueData.purchaseQuantity - catalogueData.removeQuantity;

    await page.goto('/');
    await inventoryPage.navigate();
    await inventoryPage.waitForPageLoad();

    await expect(
      inventoryPage.getPurchasedItemButton(item_name)
    ).toBeVisible();

    await inventoryPage.clickPurchasedItem(item_name);
    await inventoryPage.removeQuantity(catalogueData.removeQuantity);
    await inventoryPage.waitForPageLoad();

    await expect(
      inventoryPage.getPurchasedItemButton(item_name)
    ).toContainText(String(expected_qty));
  });
});
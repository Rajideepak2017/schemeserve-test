import { test, expect }                      from '../../fixtures/fixtures.ts';
import { deleteAllPurchases }                from '../../utils/apiHelper.ts';
import { inventory_text }                    from '../../utils/constants.ts';
import catalogueData from '../../test-data/catalogue.json' with { type: 'json' };

test.describe('Purchase flow — Catalogue to Inventory', () => {

  test.afterAll(async ({ request }) => {
    await deleteAllPurchases(request);
  });

  test('Purchase item and verify Inventory', async ({
    page,
    cataloguePage,
    inventoryPage,
  }) => {

    await page.goto('/');
    await cataloguePage.navigate();

    const purchased_item_name = await cataloguePage.selectFirstItem();
    await cataloguePage.clickPurchaseButton();

    await cataloguePage.modal_qty_input.fill(String(catalogueData.purchaseQuantity));
    await Promise.all([
      expect(cataloguePage.modal_toast).toBeVisible(),
      cataloguePage.modal_submit_btn.click(),
    ]);

    await inventoryPage.navigate();
    await inventoryPage.waitForPageLoad();

    await expect(
      inventoryPage.getPurchasedItemButton(purchased_item_name)
    ).toBeVisible();

    const all_btn_texts    = await inventoryPage.getAllButtonTexts();
    const unpurchased_btns = all_btn_texts.filter(t => t.includes(inventory_text.notPurchased));
    const purchased_btns   = all_btn_texts.filter(t => t.includes(inventory_text.purchased));

    expect(purchased_btns.length).toBeGreaterThan(0);
    expect(unpurchased_btns.length).toBeGreaterThan(0);
  });
});
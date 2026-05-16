import { Page, Locator }                         from '@playwright/test';
import { BasePage }                              from './BasePage.js';
import { nav_links, app_routes, inventory_text } from '../utils/constants.js';

export class InventoryPage extends BasePage {
  readonly page_heading: Locator;

  // Remove quantity modal — opened from this page only
  readonly remove_qty_input: Locator;
  readonly remove_btn:       Locator;
  readonly warning_msg:      Locator;

  constructor(page: Page) {
    super(page);
    this.page_heading     = page.getByRole('heading', { name: 'Inventory purchased' });
    this.remove_qty_input = page.locator('.modal input[type="number"]');
    this.remove_btn       = page.locator('.modal button.submitBtn');
    this.warning_msg      = page.locator('.modal .warning');
  }

  async navigate(): Promise<void> {
    await this.navigateTo(nav_links.inventory, app_routes.inventory);
  }

  getPurchasedItemButton(itemName: string): Locator {
    return this.page
      .locator('button.primaryBtn', { hasText: `${itemName} ${inventory_text.purchased}` })
      .first();
  }

  getUnpurchasedItemButton(itemName: string): Locator {
    return this.page
      .locator('button.primaryBtn', { hasText: `${itemName} ${inventory_text.notPurchased}` });
  }

  async clickPurchasedItem(itemName: string): Promise<void> {
    await this.getPurchasedItemButton(itemName).click();
  }

  async removeQuantity(quantity: number): Promise<void> {
    await this.remove_qty_input.fill(String(quantity));
    await this.remove_btn.click();
  }

  async getAllButtonTexts(): Promise<string[]> {
    return this.page.locator('button.primaryBtn').allTextContents();
  }
}
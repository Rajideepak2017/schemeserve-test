import { Page, Locator }                         from '@playwright/test';
import { BasePage }                              from './BasePage.ts';
import { nav_links, app_routes, inventory_text } from '../utils/constants.ts';

export class InventoryPage extends BasePage {
  readonly page_heading:     Locator;
  readonly remove_qty_input: Locator;
  readonly remove_btn:       Locator;

  constructor(page: Page) {
    super(page);
    this.page_heading     = page.getByRole('heading', { name: 'Inventory purchased' });
    this.remove_qty_input = page.locator('.modal input[type="number"]');
    this.remove_btn       = page.locator('.modal button.submitBtn');
  }

  async navigate(): Promise<void> {
    await this.navigateTo(nav_links.inventory, app_routes.inventory);
  }

  getPurchasedItemButton(itemName: string): Locator {
    return this.page
      .locator('button.primaryBtn', { hasText: `${itemName} ${inventory_text.purchased}` })
      .first();
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
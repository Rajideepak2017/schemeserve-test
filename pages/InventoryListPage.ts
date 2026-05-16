import { Page, Locator }                         from '@playwright/test';
import { BasePage }                              from './BasePage.js';
import { nav_links, app_routes, inventory_text } from '../utils/constants.js';

export class InventoryListPage extends BasePage {
  readonly page_heading: Locator;

  constructor(page: Page) {
    super(page);
    this.page_heading = page.getByRole('heading', { name: 'Inventory purchased as a list' });
  }

  async navigate(): Promise<void> {
    await this.navigateTo(nav_links.inventoryList, app_routes.inventoryList);
  }

  getPurchasedItemButton(itemName: string): Locator {
    return this.page
      .locator('button.primaryBtn', { hasText: `${itemName} ${inventory_text.purchased}` })
      .first();
  }

  async getAllListedItems(): Promise<string[]> {
    return this.page.locator('button.primaryBtn').allTextContents();
  }
}
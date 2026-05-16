import { Page, Locator }         from '@playwright/test';
import { BasePage }              from './BasePage.js';
import { nav_links, app_routes } from '../utils/constants.js';

export class CataloguePage extends BasePage {
  readonly catalogue_dropdown: Locator;
  readonly purchase_button:    Locator;

  // Purchase modal — opened from this page only
  readonly modal_qty_input:  Locator;
  readonly modal_submit_btn: Locator;
  readonly modal_toast:      Locator;

  constructor(page: Page) {
    super(page);
    this.catalogue_dropdown = page.locator('#catalogue-dropdown');
    this.purchase_button    = page.locator('button.submitBtn').first();
    this.modal_qty_input    = page.locator('.inputField[type="text"]');
    this.modal_submit_btn   = page.locator('.actionsContainer button.submitBtn');
    this.modal_toast        = page.locator('.toast-banner');
  }

  async navigate(): Promise<void> {
    await this.navigateTo(nav_links.catalogue, app_routes.catalogue);
  }

  async selectItemByName(itemName: string): Promise<void> {
    await this.catalogue_dropdown.selectOption({ label: itemName });
  }

  async selectFirstItem(): Promise<string> {
    await this.catalogue_dropdown.selectOption({ index: 1 });
    const selected_text = await this.catalogue_dropdown.evaluate(
      (el: HTMLSelectElement) => el.options[el.selectedIndex]?.text ?? ''
    );
    return selected_text.split('(')[0].trim();
  }

  async clickPurchaseButton(): Promise<void> {
    await this.purchase_button.click();
  }

  async submitPurchase(quantity: number): Promise<void> {
    await this.modal_qty_input.fill(String(quantity));
    await this.modal_submit_btn.click();
  }
}
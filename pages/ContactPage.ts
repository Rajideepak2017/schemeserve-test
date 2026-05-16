import { Page, Locator }         from '@playwright/test';
import { BasePage }              from './BasePage.ts';
import { nav_links, app_routes } from '../utils/constants.ts';

export class ContactPage extends BasePage {
  readonly firstName_input: Locator;
  readonly lastName_input:  Locator;
  readonly address1_input:  Locator;
  readonly address2_input:  Locator;
  readonly address3_input:  Locator;
  readonly address4_input:  Locator;
  readonly tos_checkbox:    Locator;
  readonly submit_button:   Locator;
  readonly error_message:   Locator;
  readonly success_popup:   Locator;

  constructor(page: Page) {
    super(page);
    this.firstName_input = page.locator('input[name="firstName"]');
    this.lastName_input  = page.locator('input[name="lastName"]');
    this.address1_input  = page.locator('input[name="address1"]');
    this.address2_input  = page.locator('input[name="address2"]');
    this.address3_input  = page.locator('input[name="address3"]');
    this.address4_input  = page.locator('input[name="address4"]');
    this.tos_checkbox    = page.locator('input[name="agree"]');
    this.submit_button   = page.locator('button[type="submit"]');
    this.error_message   = page.getByText('First Name, Last Name are required and you must agree to Terms of Service.');
    this.success_popup   = page.getByText('Thank you for your submission!');
  }

  async navigate(): Promise<void> {
    await this.navigateTo(nav_links.contact, app_routes.contact);
  }

  async selectPet(petValue: string): Promise<void> {
    await this.page.locator(`input[name="pet"][value="${petValue}"]`).check();
  }

  async fillForm(data: {
    firstName: string;
    lastName:  string;
    address1?: string;
    address2?: string;
    address3?: string;
    address4?: string;
    pet?:      string;
  }): Promise<void> {
    await this.firstName_input.fill(data.firstName);
    await this.lastName_input.fill(data.lastName);
    if (data.address1) await this.address1_input.fill(data.address1);
    if (data.address2) await this.address2_input.fill(data.address2);
    if (data.address3) await this.address3_input.fill(data.address3);
    if (data.address4) await this.address4_input.fill(data.address4);
    if (data.pet)      await this.selectPet(data.pet);
  }

  async acceptTerms(): Promise<void> {
    await this.tos_checkbox.check();
  }

  async submit(): Promise<void> {
    await this.submit_button.click();
  }
}
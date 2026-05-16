import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

/**
 * ContactPage — interactions with /ContactForm
 *
 * Real UI (from source):
 *  - firstName, lastName: input[type="text"] with name attribute
 *  - address1-4: input[type="text"] with name attribute
 *  - pet: radio buttons (cat, dog, rabbit, other, noPet)
 *  - agree: input[type="checkbox"] id="checkbox" name="agree"
 *  - Submit button: type="submit"
 *  - Validation: custom JS (NOT HTML5 required) — shows error div in red
 *  - Error text: "First Name, Last Name are required and you must agree to Terms of Service."
 *  - Success: popup with "Thank you for your submission!"
 */
export class ContactPage extends BasePage {
  readonly firstName_input:  Locator;
  readonly lastName_input:   Locator;
  readonly address1_input:   Locator;
  readonly address2_input:   Locator;
  readonly address3_input:   Locator;
  readonly address4_input:   Locator;
  readonly tos_checkbox:     Locator;
  readonly submit_button:    Locator;
  readonly error_message:    Locator;
  readonly success_popup:    Locator;

  constructor(page: Page) {
    super(page);
    this.firstName_input  = page.locator('input[name="firstName"]');
    this.lastName_input   = page.locator('input[name="lastName"]');
    this.address1_input   = page.locator('input[name="address1"]');
    this.address2_input   = page.locator('input[name="address2"]');
    this.address3_input   = page.locator('input[name="address3"]');
    this.address4_input   = page.locator('input[name="address4"]');
    this.tos_checkbox     = page.locator('input[name="agree"]');
    this.submit_button    = page.locator('button[type="submit"]');
    this.error_message    = page.getByText('First Name, Last Name are required and you must agree to Terms of Service.');
    this.success_popup    = page.getByText('Thank you for your submission!');
  }

  async navigate(): Promise<void> {
    await this.goto('/ContactForm');
  }

  /** Select a pet radio option: 'cat' | 'dog' | 'rabbit' | 'other' | 'noPet' */
  async selectPet(petValue: string): Promise<void> {
    await this.page.locator(`input[name="pet"][value="${petValue}"]`).check();
  }

  /** Fill all form fields. */
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

  /** Check the Terms of Service checkbox. */
  async acceptTerms(): Promise<void> {
    await this.tos_checkbox.check();
  }

  /** Click the Submit button. */
  async submit(): Promise<void> {
    await this.submit_button.click();
  }

  /** Submit with empty form to trigger validation. */
  async submitEmpty(): Promise<void> {
    await this.submit_button.click();
  }

  /** Returns true if the custom validation error message is visible. */
  async validationErrorIsVisible(): Promise<boolean> {
    return this.error_message.isVisible();
  }

  /** Returns true if the success popup is shown. */
  async submissionSucceeded(): Promise<boolean> {
    return this.success_popup.isVisible({ timeout: 8_000 });
  }
}

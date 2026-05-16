import { Page } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async navigateTo(navLabel: string, urlFragment: string): Promise<void> {
    await this.page.getByRole('link', { name: navLabel, exact: true }).click();
    await this.page.waitForURL(`**${urlFragment}**`);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
}
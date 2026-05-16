import { Page, Locator }         from '@playwright/test';
import { BasePage }              from './BasePage.ts';
import { nav_links, app_routes } from '../utils/constants.ts';

export class ReportsPage extends BasePage {
  readonly journal_entries_tab: Locator;
  readonly general_ledger_tab:  Locator;
  readonly search_input:        Locator;

  constructor(page: Page) {
    super(page);
    this.journal_entries_tab = page.getByRole('button', { name: 'Journal Entries' });
    this.general_ledger_tab  = page.getByRole('button', { name: 'General Ledger' });
    this.search_input        = page.locator('input[placeholder*="search" i]');
  }

  async navigate(): Promise<void> {
    await this.navigateTo(nav_links.reports, app_routes.reports);
  }

  async openGeneralLedgerTab(): Promise<void> {
    await this.general_ledger_tab.click();
  }

  async openJournalEntriesTab(): Promise<void> {
    await this.journal_entries_tab.click();
  }

  async search(term: string): Promise<void> {
    await this.search_input.fill(term);
  }
}
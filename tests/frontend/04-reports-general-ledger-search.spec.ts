import { test, expect } from '../../fixtures/fixtures.ts';
import reportsData      from '../../test-data/reports.json' with { type: 'json' };

test('General Ledger search filters results', async ({
  page,
  reportsPage,
}) => {

  await page.goto('/');
  await reportsPage.navigate();
  await reportsPage.openGeneralLedgerTab();
  await reportsPage.search(reportsData.searchTerm);

  await expect(
    page.getByText('Cash', { exact: false })
  ).toBeVisible();

  await expect(page.getByText('Accounts Receivable')).not.toBeVisible();
  await expect(page.getByText('Rent Expense')).not.toBeVisible();
  await expect(page.getByText('Marketing Expense')).not.toBeVisible();
});
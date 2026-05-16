import { test as base } from '@playwright/test';
import { CataloguePage }     from '../pages/CataloguePage.js';
import { InventoryPage }     from '../pages/InventoryPage.js';
import { InventoryListPage } from '../pages/InventoryListPage.js';
import { ReportsPage }       from '../pages/ReportsPage.js';
import { ContactPage }       from '../pages/ContactPage.js';

type PageFixtures = {
  cataloguePage:     CataloguePage;
  inventoryPage:     InventoryPage;
  inventoryListPage: InventoryListPage;
  reportsPage:       ReportsPage;
  contactPage:       ContactPage;
};

export const test = base.extend<PageFixtures>({
  cataloguePage: async ({ page }, use) => {
    await use(new CataloguePage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  inventoryListPage: async ({ page }, use) => {
    await use(new InventoryListPage(page));
  },
  reportsPage: async ({ page }, use) => {
    await use(new ReportsPage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
});

export { expect } from '@playwright/test';
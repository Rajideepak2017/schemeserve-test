# SchemeServe QA Tech Test — Playwright Test Suite

Playwright TypeScript test suite for the SchemeServe coffee shop 
purchasing application.

---

## Prerequisites

- **Node.js** ≥ 18
- SchemeServe application running locally:
  - **Terminal 1:** `npm run dev` → http://localhost:5173
  - **Terminal 2:** `npm run server` → http://localhost:3030

---

## Installation

Clone this repository and install dependencies:

```bash
git clone https://github.com/Rajideepak2017/schemeserve-test.git
cd schemeserve-test
npm install
npx playwright install chromium
```

---

## Running the tests

```bash
# Run all tests
npm test

# Run with browser visible
npm run test:headed

# View HTML report after run
npm run test:report
```

---

## Project structure
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json
├── README.md
├── BUGS.md                       # Bug report from exploratory testing
│
├── test-data/                    # Test data — JSON files
│   ├── catalogue.json            # Catalogue items and quantities
│   ├── contacts.json             # Contact form data
│   └── reports.json              # Search terms
│
├── fixtures/
│   └── fixtures.ts               # Custom Playwright fixtures
│
├── pages/                        # Page Object Model
│   ├── BasePage.ts               # Base class
│   ├── CataloguePage.ts          # /Catalogue
│   ├── InventoryPage.ts          # /Inventory
│   ├── InventoryListPage.ts      # /InventoryList
│   ├── ReportsPage.ts            # /Reports
│   └── ContactPage.ts            # /ContactForm
│
├── utils/
│   ├── types.ts                  # TypeScript interfaces
│   ├── constants.ts              # URLs, routes, nav links
│   ├── apiHelpers.ts             # Reusable API functions
│   ├── globalSetup.ts            # Resets data before all tests
│   └── globalTeardown.ts         # Cleans up after all tests
│
└── tests/
├── frontend/
│   ├── 01-purchase-and-inventory.spec.ts
│   ├── 02-inventory-remove-quantity.spec.ts
│   ├── 03-inventory-list-multiple-items.spec.ts
│   ├── 04-reports-general-ledger-search.spec.ts
│   └── 05-contact-form.spec.ts
└── api/
└── api.spec.ts

---

## Notes

- `globalSetup` automatically resets all test data before 
  every run — no need to restart the server manually
- `globalTeardown` cleans up all data created during the run


---

## Bugs found

See [BUGS.md](./BUGS.md) for the full bug report found 
through manual exploratory testing of the application.
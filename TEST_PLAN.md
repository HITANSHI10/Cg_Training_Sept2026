# Sauce Demo QA Test Plan

This repository contains a Playwright Test project for the public Sauce Demo application at https://www.saucedemo.com/. Coverage includes authentication, inventory, cart, checkout, navigation, cross-browser execution, HTML reporting, and CI retries.

## Current Baseline

The executable baseline includes the standard-user login smoke test, inventory and product-detail checks, cart and checkout workflows, navigation checks, and a page-object-driven end-to-end checkout flow.

## Browser Coverage

Chromium, Firefox, and WebKit are configured in `playwright.config.ts`. CI installs dependencies and browsers, runs the test suite, and uploads the HTML report.

## Execution

```bash
npm ci
npx playwright install
npx playwright test
```

Generated reports and test results are ignored by Git and should be retained as CI artifacts when needed.

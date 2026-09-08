# Sauce Demo Automation Scenarios

This plan defines independent Playwright scenarios for authentication, inventory, cart, checkout, and navigation using fresh browser state and stable selectors.

## Authentication

- Reject blank, invalid, and locked-out login attempts.
- Allow documented non-standard users to authenticate.

## Inventory and Product Details

- Display the complete six-item catalog with product controls.
- Sort inventory by name and price.
- Open a product and return to inventory.

## Cart and Checkout

- Add, remove, preserve, and reset cart state.
- Complete checkout with valid customer information.
- Block checkout when required data is absent.

## Navigation and Session

- Use All Items, log out, and protect direct inventory access.

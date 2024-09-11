# next-store

## Development

### Requirements

- node >= 20.9.0
  You can use `nvm` to use specific version with `nvm use` command.

### How to start?

- Run `npm i` to setup local development
- Then `npm start` to start the app in dev mode
- App will be available under `http://localhost:3000/`

## Technical Requirements:

- Web application should be created using React and Next.JS
- The application must be able to run locally.
- The application should be responsive, working seamlessly on both mobile and desktop layouts.

### Page Types to Implement:

- Main Page
- Category Page
- Cart page

## Functional Requirements:

- Main Page:
  - List all categories
  - Display the category name for each category.
  - Enable navigation to the category page by clicking on a category.
  - Enable navigation to the Cart Page by clicking on a basket icon in the right top corner of the page.
- Category Page:
  - Display the category name and the product count for the selected category.
  - List products specific to the selected category.
  - Display the product title, price, and image (if available).
  - Enable navigation to the main page.
  - Allow user to add a product to the user’s cart
  - Enable navigation to the Cart Page by clicking on a basket icon in the right top corner of the page.
- Cart Page:
  - Display information available for all products in the cart.
  - Display information about total price of products added to the cart.
  - Allow user to remove a product from the cart.
  - Allow user to change quantity of a product added to the cart.

## Quality Requirements:

- Maintainability
- Testability
- Readability

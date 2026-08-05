# Mono Store

Mono Store is a minimal React storefront built with Vite. It includes product
listing, search and filters, product details, a persistent cart, responsive
layout, and a REST service layer connected to a real product API.

## Technology

- React 18
- Vite 5
- React Router DOM 6
- Tailwind CSS 3
- ESLint 8
- Prettier 3
- Node.js 24.18.0 LTS

## Requirements

Install Node.js 24.18.0 LTS and npm. Check the versions before installing:

```bash
node --version
npm --version
```

## Environment configuration

Vite only exposes variables prefixed with `VITE_` to browser code. Never put
passwords, private tokens, or other secrets in these variables.

Create a local environment file from the example:

```bash
copy .env.example .env.local
```

Then update `.env.local`:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=Mono Store
```

`VITE_API_BASE_URL` is the production REST API base URL. The product service
supports these endpoints:

- `getProducts(params)` -> `GET /products`
- `getProductById(id)` -> `GET /products/:id`
- `getCategories()` -> `GET /products/categories`
- `createProduct(product)` -> `POST /products`
- `updateProduct(id, product)` -> `PUT /products/:id`
- `deleteProduct(id)` -> `DELETE /products/:id`

The create, update, and delete methods are available for administration flows
and are kept outside the storefront UI.
The local example uses `https://fakestoreapi.com`, a public REST API. Replace
it with your production API endpoint before deploying. The API must expose
`/products`, `/products/:id`, and `/products/categories` or the service layer
must be adapted to its contract.

`.env.local`, `.env.production`, and other real environment files are ignored
by Git. Only `.env.example` belongs in the repository.

## Install and run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## Build and preview

Run the production checks:

```bash
npm run lint
npm run format:check
npm run build
```

Preview the generated `dist` directory locally:

```bash
npm run preview
```

The build reads environment variables at build time. Restart the dev server
after changing `.env.local`.

## Deploy to Vercel

1. Import the GitHub repository into Vercel.
2. Keep the framework as Vite, or use build command `npm run build`.
3. Set the output directory to `dist`.
4. Add `VITE_API_BASE_URL` and `VITE_APP_NAME` in Project Settings > Environment Variables.
5. Deploy again after saving environment variables.

The included `vercel.json` keeps React Router routes working after a direct
page refresh. Configure the production API URL for Preview and Production
environments as appropriate.

## Deploy to Netlify

1. Add a new site from the GitHub repository.
2. Set the build command to `npm run build`.
3. Set the publish directory to `dist`.
4. Add `VITE_API_BASE_URL` and `VITE_APP_NAME` in Site configuration > Environment variables.
5. Trigger a new deploy after saving the variables.

The `public/_redirects` file is copied to `dist` and provides the SPA fallback
needed by React Router on Netlify.

## Pre-deploy checklist

- [ ] Copy `.env.example` to a local environment file and set the production API endpoint.
- [ ] Confirm no real `.env` file, token, password, or secret is staged.
- [ ] Run `npm run lint`.
- [ ] Run `npm run format:check`.
- [ ] Run `npm run build` successfully.
- [ ] Test `/`, `/shop`, `/product/:id`, and `/cart` in the production preview.
- [ ] Test a direct refresh on a nested route.
- [ ] Confirm the API allows requests from the deployed site origin.
- [ ] Confirm the deployed environment uses the correct `VITE_APP_NAME`.

## Project structure

```text
src/
  assets/       static assets
  components/   reusable UI, layout, and product components
  config/       environment configuration
  context/      Cart and toast contexts
  hooks/        reusable React hooks
  pages/        route-level pages
  services/     API and product services
  utils/        formatting and error utilities
```

## Development workflow

The project was built incrementally through the Vibecode prompts in
`vibecode-website-ban-hang.md`. After each feature group, run:

```bash
npm run lint
npm run format:check
npm run build
```

Keep commits focused and use Conventional Commits such as `feat:`, `fix:`,
`chore:`, `docs:`, or `refactor:`.

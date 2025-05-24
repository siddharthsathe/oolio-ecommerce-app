# Oolio Ecommerce App

A simple one-page ecommerce application built with Next.js and TypeScript. It displays a product listing alongside a cart sidebar with coupon code functionality. Users can add products to the cart, apply coupons, and place orders seamlessly.

Live preview: https://oolio-ecommerce-app.vercel.app/

## Features

- Single-page UI showing products in a grid layout
- Sticky cart sidebar on the right
- Coupon code entry and validation
- Place orders directly from the cart
- API endpoints:
  - `GET /api/products` — fetches product list
  - `POST /api/order` — submits order details

## Tech Stack

- Next.js (React framework)
- TypeScript
- Tailwind CSS for styling

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd oolio-ecommerce-app

2. Install dependencies:

   ```bash
    npm install

3. Start the development server:

   ```bash
    npm run dev


## Folder Structure

    app/
    ├── actions/
    │   └── index.ts         # Server-side API calls
    ├── components/
    │   ├── cart/            # Cart sidebar components
    │   ├── coupon-code/     # Coupon code input and logic
    │   ├── order/           # Order confirmation UI
    │   └── product/         # Product listing components
    ├── context/
    │   ├── cart.context.ts  # Cart state management with React context
    │   └── product.context.ts # Product state management
    ├── app.css
    ├── global.css
    ├── favicon.ico
    ├── layout.tsx
    └── page.tsx

    public/                  # Static assets

    next.config.ts           # Next.js configuration
    package-lock.json
    package.json
    postcss.config.mjs       # PostCSS configuration
    readme.md                # This file
    tailwind.config.ts       # Tailwind CSS configuration
    tsconfig.json            # TypeScript config

## Deployment
The app is deployed on Vercel: https://oolio-ecommerce-app.vercel.app/

Continuous deployment is set up: every push to the main branch triggers a new build and deploy

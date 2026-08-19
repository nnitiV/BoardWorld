# 🎲 Board World

A modern, production-grade, full-stack e-commerce platform built for board game enthusiasts. Featuring real-time cart state management, atomic database transactions, event-driven Stripe webhooks, and a fully responsive layout across all device viewports.

---

## 🛠️ Tech Stack

*   **Frontend:** React, Next.js (App Router), Tailwind CSS
*   **State Management & Data Fetching:** Zustand (Hybrid local & global state synchronization), TanStack React Query (Async mutations & caching)
*   **Backend & ORM:** Prisma ORM, PostgreSQL
*   **Payments:** Stripe API (Checkout Sessions, Event-Driven Webhooks)

---

## 🚀 Key Architectural Highlights

*   **Atomic Transactions:** Prisma database transactions ensure strict data integrity during high-concurrency checkouts and inventory mutations.
*   **Event-Driven Payment Handling:** Secure webhook architecture managing race conditions, inventory rollbacks, and failed or interrupted payments via a self-healing "Orders" dashboard.
*   **Hybrid State Management:** Optimized Zustand cart store that handles immediate inventory reflection, optimistic updates, and clean separation of concerns.
*   **Safe Async Mutations:** React Query mutations are strictly handled with robust `onSuccess` and `onError` callbacks to prevent race conditions during checkout flows and cart updates.
*   **Production Accessibility & SEO:** Semantic HTML elements (`button`, `Link`, strict ARIA labels) ensuring WCAG compliance and optimal search engine indexation (no hard page reloads via `window.location`).
*   **Responsive Fluid Layouts:** Fully responsive mobile-first grids, Hybrid Responsive Cards (vertical on mobile, horizontal on desktop), and modern CSS architecture designed to scale seamlessly from smartphones to ultra-wide displays.

---

## 🧩 Core Features

*   **Dynamic Product Catalog:** Responsive grid layouts with category filtering, lazy-loaded images, and pagination.
*   **Intelligent Cart System:** Real-time stock validation, performance-capped quantity selection, and optimistic UI updates.
*   **Order History & Recovery:** User dashboard to track order statuses (`PENDING`, `PAID`, `CANCELLED`) with the ability to recover and pay for interrupted checkout sessions.
*   **Community Reviews:** Integrated system for users to add, edit, and read product reviews.
*   **Admin Dashboard:** Secure overview for managing product inventory, categories, and stock limits.

---

## 📁 Project Structure

```text
board-world/
├── api/                      # Backend API (Node.js/Express)
│   ├── prisma/               # Database schema & migrations
│   └── src/
│       ├── config/           # Environment & service configurations
│       ├── controller/       # Request handlers (input/output)
│       ├── middleware/       # Route guards & request interceptors
│       ├── repository/       # Database access layer (Prisma queries)
│       ├── routes/           # API route definitions
│       ├── services/         # Core business logic
│       ├── types/            # Backend TypeScript definitions
│       ├── utils/            # Shared helper functions
│       └── server.ts         # Backend application entry point
└── ui/                       # Frontend Application (Next.js)
    └── src/
        ├── app/              # App Router (pages, layouts, API routes)
        ├── components/       # Reusable React components
        ├── hooks/            # Custom React Query & lifecycle hooks
        ├── lib/              # Third-party library initialization
        ├── providers/        # React context providers
        ├── services/         # API client functions (fetch/axios)
        ├── stores/           # Zustand global state management
        ├── types/            # Frontend TypeScript definitions
        ├── utils/            # Shared helper functions
        └── middleware.ts     # Next.js edge middleware (routing/auth)
```

# ⚙️ Getting Started
Prerequisites
Ensure you have the following installed on your local machine:

* Node.js (v18+ recommended)
* PostgreSQL Database instance
* Stripe CLI (for testing webhooks locally)

## Installation & Setup

### Clone the repository:
```
git clone https://github.com/nnitiV/BoardWorld.git
cd board-world
```

## Back-End
Install dependencies: 
```
cd ui
npm install
```

Configure Environment Variables: Create a .env file in the root directory and populate the required keys:
```
DATABASE_URL="postgresql://user:password@localhost:5432/board_world?schema=public"
BACKEND_PORT=5173
BACKEND_HOST=http://localhost:
NODE_ENV="development"
JWT_SECRET="Some secret"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### 💳 Stripe Webhook Testing (Local)
To test checkout flows and webhook event listeners locally, use the Stripe CLI:
```
stripe listen --forward-to localhost:5173/api/webhooks/stripe
```
Copy the generated webhook signing secret and paste it into your .env file as STRIPE_WEBHOOK_SECRET.

Run the Development Server:
```
npm run dev
```

## Front-End
Install dependencies: 
```
cd ui
npm install
```

Configure Environment Variables: Create a .env file in the root directory and populate the required keys:
```
API_URL="http://localhost:5173"
BASE_URL="http://localhost:5173/api"
```
Run the Development Server:
```
npm run dev
```
Open http://localhost:3000 with your browser to see the application.

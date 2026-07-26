# Wyze Security System Bundle Builder - Frontend Take-Home + Backend Bonus ⚡

A production-ready, interactive 2-column React prototype for a multi-step security system bundle builder with a synchronized live review panel, precise color variant quantity tracking, client & server persistence, and an Express API backend bonus.

---

## 🚀 Quick Start & Run Instructions

From a clean clone:

```bash
# 1. Install dependencies
npm install

# 2. Start both Express Backend API & Vite Frontend concurrently
npm run dev

# 3. Build for production (TypeScript check & Vite bundling)
npm run build
```

- **Frontend App**: `http://localhost:5173`
- **Backend API Server**: `http://localhost:3001` (Serves `GET /api/products`, `POST /api/save-bundle`, `GET /api/saved-bundle`)

---

## ⚡ Backend Bonus (Express API Server)

This project includes the **optional Backend Bonus** implemented in `/server/server.js`:

- **RESTful Endpoints**:
  - `GET /api/products`: Dynamically serves steps, product database, and initial bundle state from JSON.
  - `POST /api/save-bundle`: Persists customer system configuration on the server (`server/saved_bundle.json`).
  - `GET /api/saved-bundle`: Retrieves the last saved bundle configuration.
  - `GET /api/health`: Health status endpoint.
- **Graceful Fallback**: If the server is offline, the React frontend seamlessly falls back to local data and `localStorage` without breaking user interaction.

---

## ✨ Core Features Implemented

1. **Data-Driven Architecture**:
   - Renders 4 steps and 10 products dynamically from API server or local JSON configuration.
   - Pre-populated with the exact initial seeded state from Figma ($187.89 total, saving $50.92).

2. **Accordion Step Navigation (`AccordionStep.tsx`)**:
   - 4-step vertical accordion:
     1. Choose your cameras (open on initial load)
     2. Choose your plan
     3. Choose your sensors
     4. Add extra protection
   - Displays real-time `N selected` counter per step (distinct products chosen).
   - "Next: [Next Step Title]" buttons at the bottom of expanded steps advance the accordion smoothly.

3. **Product Cards & Variant Selector (`ProductCard.tsx`)**:
   - Optional discount badges (`Save 22%`, `Save 12%`).
   - Color variant swatches (White, Grey, Black) for products with color choices.
   - **Variant Quantity Isolation**: Each variant is tracked independently (`${productId}_${variantId}`). Selecting a color chip binds the quantity stepper to *that specific variant's count* while leaving other variants' quantities untouched.
   - Selected card highlighting (`border-2 border-[#4E2FD2]`) when product quantity > 0.

4. **Live Synchronized Review Panel (`ReviewPanel.tsx`)**:
   - Categorized line items grouped under `CAMERAS`, `SENSORS`, `ACCESSORIES`, and `HOME MONITORING PLAN`.
   - Every variant with quantity > 0 displays as its own independent line item.
   - Quantity steppers in the review panel stay in 100% sync with main builder cards.
   - Automatic recalculation of pre-discount subtotal, active total, total savings callout, and monthly financing breakdown.
   - **Fast Shipping**: `$5.99` struck through → `FREE`.
   - **Satisfaction Guarantee**: 100% Wyze satisfaction guarantee badge.

5. **Dual Persistence ("Save my system for later")**:
   - Saves shopper configuration (`quantities`, `activeVariants`, `expandedStepId`) to both `localStorage` and Backend API (`POST /api/save-bundle`).
   - Toast feedback notifies the shopper when their system is saved.

6. **Responsiveness**:
   - Desktop: 2-column side-by-side experience matching Figma (768px left column + 399px right panel).
   - Mobile: Responsive single-column layout stacked cleanly down to phone sizes (390px) with "Let's get started!" header.

---

## 🛠️ Architecture & Folder Structure

```
bundle-builder/
├── server/
│   ├── server.js          # Express API server (Bonus)
│   └── saved_bundle.json  # Server-side saved configurations
├── src/
│   ├── components/
│   │   ├── AccordionStep.tsx   # Step accordion container & navigation
│   │   ├── CheckoutModal.tsx   # Order preview checkout modal
│   │   ├── ProductCard.tsx     # Card with variant chips & stepper
│   │   ├── ProductImages.tsx   # Custom SVG graphics for Wyze hardware
│   │   ├── ReviewPanel.tsx     # Live review summary panel
│   │   └── Toast.tsx           # Save system toast feedback
│   ├── context/
│   │   ├── BundleContext.ts    # React Context & useBundle hook definition
│   │   └── BundleProvider.tsx  # State provider with API & fallback logic
│   ├── data/
│   │   └── products.json       # Step definitions & product database
│   ├── types/
│   │   └── bundle.ts           # TypeScript interfaces
│   ├── App.tsx                 # Main layout & grid container
│   ├── index.css               # Design system tokens & Tailwind CSS
│   └── main.tsx                # Entry point
```

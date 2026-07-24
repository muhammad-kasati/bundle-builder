# Wyze Security System Bundle Builder - Frontend Take-Home

A production-ready, interactive 2-column React prototype for a multi-step security system bundle builder with a synchronized live review panel, precise color variant quantity tracking, and `localStorage` persistence.

![Bundle Builder Preview](https://raw.githubusercontent.com/wyze/bundle-builder/main/preview.png)

---

## 🚀 Quick Start & Run Instructions

From a clean clone:

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev

# 3. Build for production (TypeScript check & Vite bundling)
npm run build
```

Open your browser at `http://localhost:5173` to interact with the bundle builder.

---

## ✨ Features Implemented

1. **Data-Driven Architecture (`/src/data/products.json`)**:
   - Renders 4 steps and 10 products dynamically from structured JSON configuration.
   - Pre-populated with the exact initial seeded state from Figma ($187.89 total, saving $50.92).

2. **Accordion Step Navigation (Left Column)**:
   - 4-step vertical accordion:
     1. Choose your cameras (open on initial load)
     2. Choose your plan
     3. Choose your sensors
     4. Add extra protection
   - Displays real-time `N selected` counter per step (distinct products chosen).
   - "Next: [Next Step Title]" buttons at the bottom of expanded steps advance the accordion smoothly.

3. **Product Cards & Variant Selector**:
   - Optional discount badges (`Save 22%`, `Save 12%`).
   - Color variant swatches (White, Grey, Black) for products with color choices.
   - **Variant Quantity Isolation**: Each variant is tracked independently (`${productId}_${variantId}`). Selecting a color chip binds the quantity stepper to *that specific variant's count* while leaving other variants' quantities untouched.
   - Selected card highlighting (`border-2 border-[#4E2FD2]`) when product quantity > 0.

4. **Live Synchronized Review Panel ("Your security system")**:
   - Categorized line items grouped under `CAMERAS`, `SENSORS`, `ACCESSORIES`, and `HOME MONITORING PLAN`.
   - Every variant with quantity > 0 displays as its own independent line item.
   - Quantity steppers in the review panel stay in 100% sync with the main builder cards.
   - Automatic recalculation of pre-discount subtotal, active total, total savings callout, and monthly financing breakdown.
   - **Fast Shipping**: `$5.99` struck through → `FREE`.
   - **Satisfaction Guarantee**: 100% Wyze satisfaction guarantee badge.

5. **Persistence ("Save my system for later")**:
   - Saves shopper configuration (`quantities`, `activeVariants`, `expandedStepId`) to `localStorage`.
   - Page reloads or return visits restore the exact state.
   - Toast feedback notifies the shopper when their system is saved.

6. **Responsiveness**:
   - Desktop: 2-column side-by-side experience with sticky review panel.
   - Mobile: Responsive single-column layout stacked cleanly down to phone sizes (390px).

---

## 🛠️ Architecture & Folder Structure

```
bundle-builder/
├── src/
│   ├── components/
│   │   ├── AccordionStep.tsx   # Step accordion container & navigation
│   │   ├── CheckoutModal.tsx   # Order preview checkout modal
│   │   ├── ProductCard.tsx     # Card with variant chips & stepper
│   │   ├── ProductImages.tsx   # Custom SVG graphics for Wyze hardware
│   │   ├── ReviewPanel.tsx     # Live review summary panel
│   │   └── Toast.tsx           # Save system toast feedback
│   ├── context/
│   │   └── BundleContext.tsx   # Centralized React Context state management
│   ├── data/
│   │   └── products.json       # Step definitions & product database
│   ├── types/
│   │   └── bundle.ts           # TypeScript interfaces
│   ├── App.tsx                 # Main layout & grid container
│   ├── index.css               # Design system tokens & Tailwind CSS
│   └── main.tsx                # Entry point
```

---

## 🎯 Key Design Decisions & Trade-offs

1. **State Key Format (`productId_variantId`)**:
   - Using composite keys in a flat dictionary (`QuantitiesState`) allowed O(1) lookups for stepper synchronization between cards and line items without deep object mutation.
2. **SVG Product Visuals**:
   - Used custom React SVG illustration components for all 10 products instead of static PNG assets to eliminate broken image links, preserve crisp scaling on high-DPI retina displays, and allow dynamic color changes for dark/light product variants.
3. **Tailwind CSS v4 & Lucide React**:
   - Used Tailwind CSS for rapid responsive utility styling and Lucide icons for UI controls (chevrons, steppers, shield).
"# bundle-builder" 

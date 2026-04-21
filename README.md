# ROSÉ Fashion — Next.js eCommerce Platform

A production-ready, SEO-optimized eCommerce platform built with **Next.js 15 App Router**, **TypeScript**, **Tailwind CSS**, and **Redux Toolkit**.

## 🚀 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 15 (App Router) | Framework + SSR/SSG |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Redux Toolkit | State management |
| Framer Motion | Animations |
| next-themes | Dark mode |
| Sonner | Toast notifications |
| next/image | Optimized images |
| next/font | Optimized fonts |

## 📦 Getting Started

```bash
# Install dependencies
npm install
# or
bun install

# Run dev server
npm run dev

# Build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## 🗂 Project Structure

```
app/                     # Next.js App Router
├── layout.tsx           # Root layout (providers, header, footer)
├── page.tsx             # Home page (SSR)
├── not-found.tsx        # 404 page
├── sitemap.ts           # Dynamic sitemap
├── product/[id]/        # Product detail (SSG with generateStaticParams)
├── search/              # Search & filter page (SSR)
├── cart/                # Cart page (client)
├── checkout/            # Checkout (3-step: address → payment → review)
├── wishlist/            # Wishlist page
└── auth/                # Login / Register

components/
├── layout/              # Header (sticky, mega-menu, currency), Footer
├── home/                # HeroCarousel, CategoryBar, PromoStrip
├── product/             # ProductCard, ProductGrid, SkeletonCard
└── providers/           # ReduxProvider (with localStorage hydration), ThemeProvider

store/                   # Redux Toolkit slices
├── cartSlice.ts
├── wishlistSlice.ts
├── authSlice.ts
└── currencySlice.ts

data/products.ts         # 25+ products across all categories
types/index.ts           # TypeScript types (Product, CartItem, etc.)
hooks/useCurrency.ts     # Multi-currency formatting hook
```

## 🛍 Product Categories

- 👔 Men — Shirts, Chinos, T-Shirts, Jackets, Watches
- 👗 Women — Dresses, Tops, Skirts, Watches, Beauty
- 🧸 Kids — Boys, Girls
- 📱 Electronics — Mobiles, Laptops, TVs
- 💄 Beauty — Skincare, Makeup, Haircare
- 🛒 Grocery — Snacks, Dairy
- 💊 Medicine — Vitamins
- 🛋 Furniture — Sofas, Tables

## 🌍 Multi-Currency Support

Supports: 🇺🇸 USD · 🇮🇳 INR · 🇬🇧 GBP · 🇨🇦 CAD · 🇦🇺 AUD

Currency persisted in localStorage, selector in header.

## 🔍 SEO

- `generateMetadata()` on every page
- Product pages: title, description, Open Graph, Twitter cards
- Product structured data (price, availability)
- Dynamic sitemap at `/sitemap.xml`
- robots.txt

## ✨ Features

- SSR on home & search pages
- SSG on product detail pages (`generateStaticParams`)
- Zoom on product images (hover)
- Skeleton loaders
- Framer Motion animations throughout
- Dark/light theme
- Responsive (mobile → desktop)
- Persistent cart & wishlist (localStorage)
- 3-step checkout flow
- Filter panel (brand, color, size, price, rating)

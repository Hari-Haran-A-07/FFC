# 🍗 FFC — FRIENDS FRIED CHICKEN
> **“YOU CREATE IT. WE FRY IT.”**  
> *A premium food-tech e-commerce platform and interactive chicken customization experience.*

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2D6?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🔥 Overview

**FFC (Friends Fried Chicken)** is an original, production-ready QSR food-tech brand experience. Moving away from generic restaurant templates, FFC combines **cinematic product presentation**, a **gaming-inspired 6-step chicken customizer**, **real-time Canvas particle visualizers**, and an **e-commerce checkout & live order tracking engine**.

---

## 🌟 Core Features

### 1. ⚡ "Make Your Chicken" 6-Step Creation Lab (`/make-your-chicken`)
* **Step 01: Choose Your Cut**: Whole breast strips, bone-in golden pieces, blistered wings, burger fillets, popcorn chicken, or tenders.
* **Step 02: Choose Your Crunch**: Calibrated texture factors from Classic (85dB) to Double Crunch (135dB).
* **Step 03: Choose Your Flavour**: Fire BBQ, Peri Peri, Honey Heat, Garlic Herb, Ghost Fire Hot, Chilli Lime, Smoky Tandoori.
* **Step 04: Calibrate Spice Level**: Interactive 5-level heat meter with dynamic flame aura and `🔥 YOU HAVE ENTERED THE FIRE ZONE` alert.
* **Step 05: Choose Sauce & Placement**: Drizzled directly on top, served on the side, or double-dip loaded.
* **Step 06: Build Your Meal & Name Creation**: Crinkle fries, dips, drinks, molten lava desserts, and custom recipe naming with unique Creation ID generator (`FFC-CREATE-XXXXX`).
* **Live Reactive Visualizer**: Layered Canvas shader reacting in real time to crunch, spice dustings, sauce glazes, steam, sparks, and 3D parallax cursor tilt.
* **Live Dynamic Price Engine**: Itemized real-time ticket calculation.
* **Cinematic Reveal Modal**: Sound fanfare, confetti explosion, recipe link copying, WhatsApp sharing, and instant checkout.

### 2. 🎬 Cinematic Initial Loading Experience
* Fullscreen near-black background with rotating glowing ember.
* Emerging 3D chicken piece transitioning into a flame and sparks eruption.
* Animated FFC brand reveal with `SKIP INTRO`, `sessionStorage` memory, and `prefers-reduced-motion` detection.

### 3. 🍔 Menu & Ordering Architecture (`/menu`)
* Complete catalog across 10+ categories (Chicken, Burgers, Wings, Strips, Popcorn, Buckets, Meals, Sides, Dips, Drinks, Desserts).
* Quick filters: Vegetarian toggle, Fire Zone spice filter, category tabs, and real-time search.
* Product Detail modal with ingredient lists, allergen charts, calorie metrics, and "Make it a Feast" upsells.

### 4. 🏷️ Deals & Squad Combos (`/deals`)
* Promotional drops (`FIREFRIDAY`, `FIRSTCRUNCH`, `DUOCRUNCH`, `SQUAD100`) with instant coupon code application.

### 5. 📍 Store Locator & Cloud Kitchen Network (`/locations`)
* Flagship fry lab directory across Bengaluru, Mumbai, and Delhi NCR.
* Live geolocation calculation, opening hours, pickup/delivery routing.

### 6. 🛵 Live Simulated Kitchen & Delivery Tracker (`/track/[id]`)
* 6-stage order lifecycle: *Order Received → Kitchen Started → Frying in 175°C Oil (with bubbling animation) → Packed → Out for Delivery → Delivered*.
* Interactive courier card and real-time stage simulator.

### 7. 🔊 Web Audio API Sound Synthesizer
* Native synthesized sound effects for crisp crunches, frying sizzles, fire whooshes, and chimes without external audio dependencies.
* Global SFX toggle with live pulse indicator.

---

## 🛠️ Tech Stack

* **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server & Client Components)
* **Frontend Library**: [React 19](https://react.dev/)
* **Language**: [TypeScript](https://www.typescriptlang.org/) (`strict: true`)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) with bespoke design tokens & custom keyframes
* **Icons**: [Lucide React](https://lucide.react.dev/) & custom SVG graphics
* **Graphics & FX**: HTML5 Canvas 2D particle engine, CSS 3D transforms, `canvas-confetti`
* **Audio**: Native Web Audio API Synthesizer
* **State Management**: React Context with LocalStorage persistence

---

## 📂 Project Structure

```
FFC/
├── app/
│   ├── about/              # Brand story & fry science page
│   ├── admin/              # Command center & kitchen telemetry
│   ├── api/                # API routes (customizer validation, orders)
│   ├── cart/               # Full cart page
│   ├── checkout/           # Multi-step checkout workflow
│   ├── deals/              # Deals and promo coupons page
│   ├── locations/          # Store locator page
│   ├── make-your-chicken/  # Standalone 6-step interactive creation lab
│   ├── menu/               # Full menu and meal boxes
│   ├── track/              # Live order tracker ([id])
│   ├── globals.css         # Global styles & keyframe animations
│   ├── layout.tsx          # Root layout, SEO metadata, JSON-LD Schema
│   ├── page.tsx            # Master homepage with 16-section flow
│   ├── robots.ts           # SEO robots.txt
│   └── sitemap.ts          # SEO sitemap.xml
├── components/
│   ├── cart/               # CartDrawer, CartItemRow, calculations
│   ├── checkout/           # CheckoutFlow steps (01 Details, 02 Address, 03 Payment)
│   ├── cta/                # FinalCTA section
│   ├── customizer/         # 6-step CustomizerEngine, ChickenVisualizer, RevealModal
│   ├── deals/              # DealsSection, DealCard
│   ├── faq/                # FAQSection accordion
│   ├── hero/               # 3D Parallax HeroSection
│   ├── layout/             # Sticky Navbar, Mega Footer
│   ├── loading/            # CinematicIntro sequence
│   ├── locations/          # StoreLocator & geolocation
│   ├── menu/               # MenuGrid, ProductCard, ProductDetailModal
│   ├── reviews/            # ReviewsSection with custom creation tags
│   ├── social/             # FriendsFeastSection
│   ├── story/              # BrandStorySection, HowItWorksSection
│   └── ui/                 # CustomCursor, SoundToggle, HeatMeter, Badge, Modal
├── context/                # CartContext, CustomizerContext, AudioContext
├── data/                   # Products, Customizer options, Deals, Stores, Reviews, FAQs
├── lib/                    # Pricing engine, Web Audio sound synthesizer, utilities
└── types/                  # TypeScript interfaces and data models
```

---

## 🚀 Getting Started

### Prerequisites
* Node.js 18.18+ or 20+ (Node 24 supported)
* npm, pnpm, or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Hari-Haran-A-07/FFC.git
   cd FFC
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Production Build**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🔒 Security & Environment

Copy `.env.example` to `.env.local` to configure environment variables:
```bash
cp .env.example .env.local
```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

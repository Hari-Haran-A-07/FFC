'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CinematicIntro } from '@/components/loading/CinematicIntro';
import { HeroSection } from '@/components/hero/HeroSection';
import { QuickOrderCategories } from '@/components/menu/QuickOrderCategories';
import { MenuGrid } from '@/components/menu/MenuGrid';
import { CustomizerEngine } from '@/components/customizer/CustomizerEngine';
import { HowItWorksSection } from '@/components/story/HowItWorksSection';
import { DealsSection } from '@/components/deals/DealsSection';
import { FriendsFeastSection } from '@/components/social/FriendsFeastSection';
import { BrandStorySection } from '@/components/story/BrandStorySection';
import { StoreLocator } from '@/components/locations/StoreLocator';
import { ReviewsSection } from '@/components/reviews/ReviewsSection';
import { FAQSection } from '@/components/faq/FAQSection';
import { FinalCTA } from '@/components/cta/FinalCTA';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/menu/ProductCard';
import { ProductDetailModal } from '@/components/menu/ProductDetailModal';
import { Product } from '@/types';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';

export default function HomePage() {
  const [introFinished, setIntroFinished] = useState(false);
  const [featuredModalProduct, setFeaturedModalProduct] = useState<Product | null>(null);

  const featuredItems = PRODUCTS.filter((p) =>
    ['ffc-friends-ultimate-bucket', 'ffc-fire-crunch-burger', 'ffc-peri-wings-8', 'ffc-strips-supreme-6'].includes(
      p.id
    )
  );

  return (
    <div className="relative min-h-screen bg-ffc-charcoal overflow-x-hidden">
      {/* 01 — Cinematic Intro Sequence */}
      {!introFinished && <CinematicIntro onComplete={() => setIntroFinished(true)} />}

      {/* 03 — Hero Section ("FRIED DIFFERENT.") */}
      <HeroSection />

      {/* 04 & 05 — Quick Order & Featured Chicken */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-2 border-b border-ffc-cardBorder/60">
          <div>
            <span className="text-[11px] font-mono text-ffc-gold uppercase tracking-widest font-black">
              MOST CRAVED BY FRIENDS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-display text-white uppercase tracking-tight mt-1">
              FEATURED SIGNATURE DROPS
            </h2>
          </div>
          <Link
            href="/menu"
            className="text-xs font-mono font-bold text-ffc-gold hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>VIEW ALL 20+ ITEMS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={(p) => setFeaturedModalProduct(p)}
            />
          ))}
        </div>

        {/* Modal for featured items */}
        <ProductDetailModal
          product={featuredModalProduct}
          isOpen={!!featuredModalProduct}
          onClose={() => setFeaturedModalProduct(null)}
        />
      </section>

      {/* 06 — Make Your Chicken (Main Interactive Experience) */}
      <div id="make-your-chicken" className="py-12 bg-gradient-to-b from-transparent via-[#140E0C] to-transparent border-y border-ffc-cardBorder/40">
        <CustomizerEngine />
      </div>

      {/* 07 — How It Works */}
      <HowItWorksSection />

      {/* 08 — Signature Menu Grid */}
      <section id="menu" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <MenuGrid initialCategory="all" limit={8} />
        <div className="text-center mt-10">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-ffc-card hover:bg-ffc-surface border border-ffc-cardBorder hover:border-ffc-gold text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <span>VIEW COMPLETE MENU & MEAL BOXES</span>
            <ArrowRight className="w-4 h-4 text-ffc-gold" />
          </Link>
        </div>
      </section>

      {/* 09 — Deals */}
      <div id="deals">
        <DealsSection />
      </div>

      {/* 10 — Friends Feast */}
      <FriendsFeastSection />

      {/* 11 — Brand Story */}
      <div id="about">
        <BrandStorySection />
      </div>

      {/* 12 — Store Locator */}
      <StoreLocator />

      {/* 13 — Reviews */}
      <ReviewsSection />

      {/* 14 — FAQ */}
      <FAQSection />

      {/* 15 — Final CTA ("YOUR CHICKEN. YOUR RULES.") */}
      <FinalCTA />
    </div>
  );
}

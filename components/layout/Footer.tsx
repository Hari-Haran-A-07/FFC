'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, ArrowRight, Check } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#080808] border-t border-ffc-cardBorder text-ffc-cream pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-ffc-cardBorder/60">
          <div className="lg:col-span-6 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-ffc-red flex items-center justify-center shadow-fire">
                <Flame className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
                FFC<span className="text-ffc-red">.</span>
              </span>
            </Link>
            <p className="text-sm text-ffc-cream/70 font-sans max-w-md leading-relaxed">
              <strong>FRIENDS FRIED CHICKEN</strong> — Built on one unyielding truth:
              &ldquo;YOU CREATE IT. WE FRY IT.&rdquo; 24-hour buttermilk-brined whole cuts, custom decibel crunch, and chef-curated fiery dustings.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-ffc-card hover:bg-ffc-red text-white flex items-center justify-center border border-ffc-cardBorder transition-all duration-300"
                aria-label="FFC Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-ffc-card hover:bg-ffc-red text-white flex items-center justify-center border border-ffc-cardBorder transition-all duration-300"
                aria-label="FFC Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.592 0 9 1.592 9 4.667V8z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-ffc-card hover:bg-ffc-red text-white flex items-center justify-center border border-ffc-cardBorder transition-all duration-300"
                aria-label="FFC YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-ffc-card hover:bg-ffc-red text-white flex items-center justify-center border border-ffc-cardBorder transition-all duration-300"
                aria-label="FFC Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="p-6 rounded-3xl bg-ffc-card/60 border border-ffc-cardBorder shadow-xl">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-ffc-gold block mb-1">
                JOIN THE CRUNCH CREW
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-display text-white uppercase tracking-tight">
                GET SECRET FLAVOUR DROPS & EXCLUSIVE DEALS
              </h3>
              <p className="text-xs text-ffc-cream/70 mt-1 mb-4 font-sans">
                Subscribe to receive early access to limited-edition spice dustings and Friday flash vouchers.
              </p>

              {subscribed ? (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 stroke-[3]" />
                  WELCOME TO THE CRUNCH CREW! CODE FIREFRIDAY HAS BEEN UNLOCKED.
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email address..."
                    className="flex-1 bg-ffc-black border border-ffc-cardBorder rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-ffc-gold font-sans"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-ffc-red to-ffc-orange text-white text-xs font-black font-display uppercase tracking-wider shadow-fire hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <span>JOIN</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Links Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-xs font-mono">
          <div className="space-y-3">
            <h4 className="text-sm font-black font-display uppercase text-white tracking-wider">
              EXPLORE
            </h4>
            <ul className="space-y-2 text-ffc-cream/70">
              <li>
                <Link href="/menu" className="hover:text-ffc-gold transition-colors">
                  Full Menu & Combos
                </Link>
              </li>
              <li>
                <Link href="/make-your-chicken" className="hover:text-ffc-gold transition-colors text-ffc-gold font-bold">
                  ⚡ Make Your Chicken Lab
                </Link>
              </li>
              <li>
                <Link href="/deals" className="hover:text-ffc-gold transition-colors">
                  Fire Friday & Squad Deals
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-ffc-gold transition-colors">
                  Live Order Tracker
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-black font-display uppercase text-white tracking-wider">
              BRAND & KITCHEN
            </h4>
            <ul className="space-y-2 text-ffc-cream/70">
              <li>
                <Link href="/about" className="hover:text-ffc-gold transition-colors">
                  Our 24-hr Brine Secret
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-ffc-gold transition-colors">
                  Find Nearest Flagship Lab
                </Link>
              </li>
              <li>
                <Link href="/about#careers" className="hover:text-ffc-gold transition-colors">
                  Join FFC Fry Masters
                </Link>
              </li>
              <li>
                <Link href="/about#nutrition" className="hover:text-ffc-gold transition-colors">
                  Nutrition & Allergen Chart
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-black font-display uppercase text-white tracking-wider">
              HELP & POLICIES
            </h4>
            <ul className="space-y-2 text-ffc-cream/70">
              <li>
                <Link href="/#faq" className="hover:text-ffc-gold transition-colors">
                  FAQs & Heat Guide
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-ffc-gold transition-colors">
                  Delivery Guarantee
                </Link>
              </li>
              <li>
                <Link href="/about#privacy" className="hover:text-ffc-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/about#terms" className="hover:text-ffc-gold transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-black font-display uppercase text-white tracking-wider">
              KITCHEN HOURS
            </h4>
            <div className="text-ffc-cream/70 space-y-1">
              <p className="text-white font-bold">Open Everyday</p>
              <p>11:00 AM – 03:00 AM</p>
              <p className="text-ffc-gold pt-1 font-bold">⚡ Late Night Frying Available</p>
              <p className="text-[10px] text-ffc-smoke pt-2">
                Order hotline: +91 80 4920 1820
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-ffc-cardBorder/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-ffc-smoke">
          <p>© {new Date().getFullYear()} FRIENDS FRIED CHICKEN (FFC). All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Flame className="w-3.5 h-3.5 text-ffc-red fill-ffc-red" />
            <span>for genuine fried chicken obsessives.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

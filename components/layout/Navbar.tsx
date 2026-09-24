'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { SoundToggle } from '@/components/ui/SoundToggle';
import {
  Flame,
  ShoppingBag,
  Search,
  Menu,
  X,
  MapPin,
  Sparkles,
  ChevronDown,
  User,
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { PRODUCTS } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

export function Navbar() {
  const pathname = usePathname();
  const { summary, toggleDrawer, orderType, setOrderType, deliveryPincode, setDeliveryPincode } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pincodeModalOpen, setPincodeModalOpen] = useState(false);
  const [tempPincode, setTempPincode] = useState(deliveryPincode);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'MENU', href: '/menu' },
    { name: 'MAKE YOUR CHICKEN', href: '/make-your-chicken', isHighlight: true },
    { name: 'DEALS', href: '/deals' },
    { name: 'ABOUT', href: '/about' },
    { name: 'LOCATIONS', href: '/locations' },
  ];

  const filteredProducts = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempPincode.trim().length >= 6) {
      setDeliveryPincode(tempPincode.trim());
      setPincodeModalOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-ffc-charcoal/95 backdrop-blur-xl border-b border-ffc-cardBorder py-3 shadow-2xl'
            : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0"
            data-cursor="pointer"
            data-cursor-label="FFC"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-ffc-red to-ffc-orange flex items-center justify-center shadow-fire group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black font-display tracking-tight text-white flex items-center gap-1 leading-none">
                FFC<span className="text-ffc-red">.</span>
              </span>
              <span className="text-[9px] font-mono font-bold tracking-widest text-ffc-gold uppercase leading-none mt-0.5">
                FRIENDS FRIED CHICKEN
              </span>
            </div>
          </Link>

          {/* Delivery / Pickup Mode Toggle Pill (Desktop) */}
          <div className="hidden xl:flex items-center bg-ffc-card/80 border border-ffc-cardBorder rounded-full p-1 text-xs font-mono">
            <button
              onClick={() => setOrderType('delivery')}
              className={`px-3 py-1 rounded-full font-bold transition-all ${
                orderType === 'delivery'
                  ? 'bg-ffc-red text-white shadow-fire'
                  : 'text-ffc-smoke hover:text-white'
              }`}
            >
              DELIVERY
            </button>
            <button
              onClick={() => setOrderType('pickup')}
              className={`px-3 py-1 rounded-full font-bold transition-all ${
                orderType === 'pickup'
                  ? 'bg-ffc-gold text-ffc-black font-black'
                  : 'text-ffc-smoke hover:text-white'
              }`}
            >
              PICKUP
            </button>
            <button
              onClick={() => setPincodeModalOpen(true)}
              className="px-2.5 py-1 text-ffc-cream/80 hover:text-ffc-gold flex items-center gap-1 border-l border-white/10 ml-1"
            >
              <MapPin className="w-3 h-3 text-ffc-red" />
              <span>{deliveryPincode}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.isHighlight) {
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    data-cursor="pointer"
                    data-cursor-label="CREATE"
                    className="relative group px-3.5 py-1.5 rounded-full bg-gradient-to-r from-ffc-red/20 to-ffc-orange/20 border border-ffc-red/50 text-xs font-black font-display tracking-wider text-ffc-gold hover:text-white hover:border-ffc-gold transition-all duration-300 flex items-center gap-1.5 shadow-fire"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-ffc-gold animate-spin-slow" />
                    <span>{link.name}</span>
                  </Link>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-mono font-bold tracking-wider transition-colors relative py-1 ${
                    isActive
                      ? 'text-ffc-gold'
                      : 'text-ffc-cream/80 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ffc-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Audio SFX Toggle */}
            <SoundToggle />

            {/* Search Trigger */}
            <button
              onClick={() => setSearchModalOpen(true)}
              aria-label="Search menu"
              data-cursor="pointer"
              data-cursor-label="SEARCH"
              className="p-2 rounded-xl bg-ffc-card/70 hover:bg-ffc-card border border-ffc-cardBorder text-ffc-cream hover:text-white transition-colors"
            >
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={toggleDrawer}
              aria-label="Open cart drawer"
              data-cursor="pointer"
              data-cursor-label="CART"
              className="relative p-2 rounded-xl bg-ffc-card/70 hover:bg-ffc-card border border-ffc-cardBorder text-ffc-cream hover:text-white transition-colors flex items-center gap-2 group"
            >
              <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-ffc-gold group-hover:scale-110 transition-transform" />
              {summary.itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-ffc-red text-white text-[10px] font-mono font-black flex items-center justify-center shadow-fire animate-bounce-short">
                  {summary.itemCount}
                </span>
              )}
            </button>

            {/* Primary Order Now Button */}
            <Link
              href="/menu"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gradient-to-r from-ffc-red to-ffc-orange text-white text-xs font-black font-display uppercase tracking-wider shadow-fire hover:brightness-110 active:scale-95 transition-all"
            >
              ORDER NOW
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-ffc-card border border-ffc-cardBorder text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-ffc-charcoal/95 backdrop-blur-2xl flex flex-col justify-between p-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-6 border-b border-ffc-cardBorder">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-xl bg-ffc-red flex items-center justify-center shadow-fire">
                <Flame className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-black font-display tracking-tight text-white">
                FFC<span className="text-ffc-red">.</span>
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-ffc-card border border-ffc-cardBorder text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Delivery Toggle for Mobile */}
          <div className="grid grid-cols-2 gap-2 bg-ffc-card p-1.5 rounded-2xl border border-ffc-cardBorder my-4">
            <button
              onClick={() => setOrderType('delivery')}
              className={`py-2 rounded-xl text-xs font-mono font-bold ${
                orderType === 'delivery' ? 'bg-ffc-red text-white' : 'text-ffc-smoke'
              }`}
            >
              DELIVERY ({deliveryPincode})
            </button>
            <button
              onClick={() => setOrderType('pickup')}
              className={`py-2 rounded-xl text-xs font-mono font-bold ${
                orderType === 'pickup' ? 'bg-ffc-gold text-ffc-black' : 'text-ffc-smoke'
              }`}
            >
              STORE PICKUP
            </button>
          </div>

          <div className="flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-xl font-black font-display uppercase tracking-tight py-2 border-b border-white/5 flex items-center justify-between ${
                  link.isHighlight
                    ? 'text-ffc-gold'
                    : pathname === link.href
                    ? 'text-ffc-red'
                    : 'text-white'
                }`}
              >
                <span>{link.name}</span>
                {link.isHighlight && (
                  <span className="text-xs font-mono bg-ffc-gold/20 text-ffc-gold px-2 py-0.5 rounded-full border border-ffc-gold/40">
                    LAB
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-ffc-cardBorder">
            <Link
              href="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-ffc-red to-ffc-orange text-white font-black font-display text-sm uppercase tracking-wider text-center block shadow-fire"
            >
              ORDER NOW
            </Link>
            <div className="flex items-center justify-between text-xs font-mono text-ffc-smoke">
              <span>FRIENDS FRIED CHICKEN</span>
              <span>11:00 AM - 03:00 AM</span>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <Modal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        title="SEARCH FFC MENU & LAB"
        subtitle="Search crispy chicken, burgers, wings, sauces, and custom items."
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ffc-smoke" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search e.g. Ghost Fire Wings, Double Crunch, Peri Peri..."
              className="w-full bg-ffc-black border border-ffc-cardBorder rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-ffc-gold"
              autoFocus
            />
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/menu#${p.id}`}
                  onClick={() => setSearchModalOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-ffc-card/60 hover:bg-ffc-card border border-ffc-cardBorder transition-colors group"
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                    <Image src={p.image} alt={p.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white group-hover:text-ffc-gold truncate">
                      {p.name}
                    </h4>
                    <span className="text-[11px] text-ffc-smoke capitalize block">
                      {p.categoryLabel}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-ffc-gold">
                    {formatPrice(p.price)}
                  </span>
                </Link>
              ))
            ) : searchQuery ? (
              <p className="text-center py-6 text-xs text-ffc-smoke font-mono">
                No crispy bites found for &ldquo;{searchQuery}&rdquo;. Try another craving!
              </p>
            ) : (
              <div className="text-xs text-ffc-smoke space-y-2 py-2">
                <span className="text-[10px] font-mono uppercase tracking-wider block text-ffc-gold">
                  POPULAR SEARCHES:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Ghost Fire Tenders', 'Double Fillet Burger', 'Peri Peri Wings', 'Crinkle Fries'].map(
                    (term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-2.5 py-1 rounded-full bg-ffc-card border border-ffc-cardBorder text-ffc-cream text-xs hover:border-ffc-gold/50"
                      >
                        {term}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* Pincode Selector Modal */}
      <Modal
        isOpen={pincodeModalOpen}
        onClose={() => setPincodeModalOpen(false)}
        title="DELIVERY LOCATION PINCODE"
        subtitle="Enter your 6-digit delivery pincode to check kitchen delivery radius."
        maxWidth="sm"
      >
        <form onSubmit={handlePincodeSubmit} className="space-y-4">
          <input
            type="text"
            maxLength={6}
            value={tempPincode}
            onChange={(e) => setTempPincode(e.target.value.replace(/\D/g, ''))}
            placeholder="e.g. 560038"
            className="w-full bg-ffc-black border border-ffc-cardBorder rounded-xl px-4 py-3 text-lg font-mono text-center text-ffc-gold tracking-widest focus:outline-none focus:border-ffc-gold"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-ffc-red hover:bg-ffc-redDark text-white font-bold text-xs uppercase tracking-wider font-mono shadow-fire"
          >
            UPDATE PINCODE
          </button>
        </form>
      </Modal>
    </>
  );
}

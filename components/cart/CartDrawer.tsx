'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Sparkles,
  Tag,
  ArrowRight,
  Flame,
  Check,
} from 'lucide-react';

export function CartDrawer() {
  const router = useRouter();
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    summary,
    updateQuantity,
    removeItem,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    orderType,
    setOrderType,
  } = useCart();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(
    null
  );

  if (!isDrawerOpen) return null;

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const res = applyCoupon(couponCodeInput);
    setCouponFeedback(res);
    if (res.success) {
      setCouponCodeInput('');
    }
  };

  const handleCheckoutRedirect = () => {
    closeDrawer();
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-fadeIn"
      />

      {/* Slide-out Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-ffc-surface border-l border-ffc-cardBorder shadow-2xl flex flex-col justify-between transform transition-transform animate-slideInRight">
          {/* Top Header */}
          <div className="p-5 sm:p-6 border-b border-ffc-cardBorder flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-ffc-gold" />
              <h2 className="text-lg font-black font-display uppercase tracking-tight text-white">
                YOUR CRISPY CART ({summary.itemCount})
              </h2>
            </div>
            <button
              onClick={closeDrawer}
              className="p-2 rounded-xl bg-ffc-card hover:bg-ffc-cardHover border border-ffc-cardBorder text-ffc-smoke hover:text-white transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Mode Toggle in Cart */}
          <div className="px-5 sm:px-6 pt-3">
            <div className="grid grid-cols-2 gap-1.5 bg-ffc-card p-1 rounded-2xl border border-ffc-cardBorder">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  orderType === 'delivery'
                    ? 'bg-ffc-red text-white shadow-fire'
                    : 'text-ffc-smoke hover:text-white'
                }`}
              >
                DELIVERY
              </button>
              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  orderType === 'pickup'
                    ? 'bg-ffc-gold text-ffc-black font-black'
                    : 'text-ffc-smoke hover:text-white'
                }`}
              >
                STORE PICKUP
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 custom-scrollbar">
            {items.length > 0 ? (
              items.map((item) => {
                const isCustom = item.type === 'custom_chicken';
                const isDeal = item.type === 'deal';

                return (
                  <div
                    key={item.cartItemId}
                    className="p-4 rounded-2xl bg-ffc-card/70 border border-ffc-cardBorder flex flex-col gap-3"
                  >
                    <div className="flex gap-3 items-start">
                      {/* Thumbnail */}
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-ffc-black shrink-0 border border-white/5">
                        <Image
                          src={
                            isCustom
                              ? item.customization?.chicken.image || ''
                              : isDeal
                              ? item.deal?.image || ''
                              : item.product?.image || ''
                          }
                          alt="Food item"
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        {isCustom && (
                          <span className="text-[9px] font-mono font-black uppercase text-ffc-gold bg-ffc-gold/15 px-2 py-0.5 rounded border border-ffc-gold/30 inline-block mb-1">
                            CUSTOM CREATION
                          </span>
                        )}
                        {isDeal && (
                          <span className="text-[9px] font-mono font-black uppercase text-ffc-red bg-ffc-red/15 px-2 py-0.5 rounded border border-ffc-red/30 inline-block mb-1">
                            SQUAD DEAL
                          </span>
                        )}

                        <h4 className="text-xs sm:text-sm font-black font-display uppercase tracking-tight text-white truncate">
                          {isCustom
                            ? item.customization?.creationName
                            : isDeal
                            ? item.deal?.title
                            : item.product?.name}
                        </h4>

                        {/* Customizer Specs summary */}
                        {isCustom && item.customization && (
                          <p className="text-[10px] text-ffc-cream/70 font-sans mt-0.5 leading-tight">
                            {item.customization.crunch.name} • {item.customization.flavour.name} • L0
                            {item.customization.spice.level} • {item.customization.sauce.name}
                          </p>
                        )}

                        {/* Addons summary */}
                        {item.selectedAddons && item.selectedAddons.length > 0 && (
                          <p className="text-[10px] text-ffc-gold font-sans mt-0.5">
                            + {item.selectedAddons.map((a) => a.name).join(', ')}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <div className="flex items-center gap-2 bg-ffc-surface px-2 py-1 rounded-xl border border-ffc-cardBorder">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-5 h-5 rounded bg-ffc-card hover:bg-ffc-cardHover flex items-center justify-center text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-white w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-5 h-5 rounded bg-ffc-gold text-ffc-black flex items-center justify-center font-bold"
                        >
                          <Plus className="w-3 h-3 stroke-[3]" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black font-display text-ffc-gold">
                          {formatPrice(item.totalPrice)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.cartItemId)}
                          className="p-1.5 text-ffc-smoke hover:text-ffc-red transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              /* Empty Cart State from Prompt: "NOTHING CRISPY YET." */
              <div className="text-center py-16 px-4 space-y-4">
                <span className="text-5xl block animate-bounce">🍗</span>
                <h3 className="text-xl font-black font-display text-white uppercase tracking-tight">
                  NOTHING CRISPY YET.
                </h3>
                <p className="text-xs text-ffc-cream/70 font-sans max-w-xs mx-auto">
                  Your chicken adventure starts here. Build your personal recipe or browse signature buckets.
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <Link
                    href="/make-your-chicken"
                    onClick={closeDrawer}
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-ffc-red to-ffc-gold text-white font-black font-display text-xs uppercase tracking-wider shadow-fire"
                  >
                    START CREATING (FRY LAB)
                  </Link>
                  <Link
                    href="/menu"
                    onClick={closeDrawer}
                    className="py-2.5 px-4 rounded-xl bg-ffc-card hover:bg-ffc-cardHover border border-ffc-cardBorder text-ffc-cream text-xs font-mono"
                  >
                    BROWSE FULL MENU
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Summary & Checkout (if items exist) */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-ffc-cardBorder bg-ffc-card/40 space-y-4">
              {/* Coupon Code Input */}
              <form onSubmit={handleCouponSubmit} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ffc-smoke" />
                    <input
                      type="text"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      placeholder="Promo code (e.g. FIREFRIDAY)"
                      className="w-full bg-ffc-black border border-ffc-cardBorder rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-white/30 uppercase font-mono focus:outline-none focus:border-ffc-gold"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-ffc-card hover:bg-ffc-cardHover border border-ffc-cardBorder text-xs font-mono font-bold text-ffc-gold"
                  >
                    APPLY
                  </button>
                </div>

                {appliedCoupon && (
                  <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                    <span>Code &ldquo;{appliedCoupon.code}&rdquo; Applied!</span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-ffc-smoke hover:text-white underline text-[10px]"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {couponFeedback && !appliedCoupon && (
                  <p className="text-[11px] text-ffc-red font-mono">{couponFeedback.message}</p>
                )}
              </form>

              {/* Price Calculation Lines */}
              <div className="space-y-1.5 text-xs font-mono text-ffc-cream/80 pt-2 border-t border-white/5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(summary.subtotal)}</span>
                </div>

                {summary.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Coupon Discount</span>
                    <span>-{formatPrice(summary.discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-ffc-smoke">
                  <span>GST (5%)</span>
                  <span>{formatPrice(summary.gstTax)}</span>
                </div>

                <div className="flex justify-between text-ffc-smoke">
                  <span>Restaurant Packaging</span>
                  <span>{formatPrice(summary.restaurantPackaging)}</span>
                </div>

                <div className="flex justify-between text-ffc-smoke">
                  <span>Delivery Fee</span>
                  <span>{summary.deliveryFee === 0 ? 'FREE' : formatPrice(summary.deliveryFee)}</span>
                </div>

                <div className="flex justify-between text-sm sm:text-base font-black font-display text-white pt-2 border-t border-white/10">
                  <span className="text-ffc-gold">GRAND TOTAL</span>
                  <span className="text-ffc-gold">{formatPrice(summary.grandTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                type="button"
                onClick={handleCheckoutRedirect}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-ffc-red via-ffc-orange to-ffc-gold text-white font-black font-display text-sm uppercase tracking-wider shadow-fire hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { items, summary, updateQuantity, removeItem, orderType, setOrderType } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center pt-24 pb-16 px-4">
        <div className="max-w-md w-full text-center bg-ffc-card/70 border border-ffc-cardBorder rounded-3xl p-8 space-y-4">
          <span className="text-5xl block animate-bounce">🍗</span>
          <h1 className="text-2xl font-black font-display text-white uppercase tracking-tight">
            NOTHING CRISPY YET.
          </h1>
          <p className="text-xs sm:text-sm text-ffc-cream/70 font-sans">
            Your chicken adventure starts here. Build your personal recipe in our fry lab or choose from our menu.
          </p>
          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              href="/make-your-chicken"
              className="py-3.5 rounded-2xl bg-gradient-to-r from-ffc-red to-ffc-gold text-white font-black font-display text-xs uppercase tracking-wider shadow-fire"
            >
              MAKE YOUR CHICKEN (LAB)
            </Link>
            <Link
              href="/menu"
              className="py-3 rounded-2xl bg-ffc-surface hover:bg-ffc-card border border-ffc-cardBorder text-ffc-cream text-xs font-mono"
            >
              EXPLORE FULL MENU
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-2xl sm:text-4xl font-black font-display text-white uppercase tracking-tight mb-8">
        YOUR CRISPY CART ({summary.itemCount} ITEMS)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Items List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {items.map((item) => {
            const isCustom = item.type === 'custom_chicken';
            const isDeal = item.type === 'deal';

            return (
              <div
                key={item.cartItemId}
                className="p-5 rounded-3xl bg-ffc-card/70 border border-ffc-cardBorder flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-ffc-black border border-white/5 shrink-0">
                    <Image
                      src={
                        isCustom
                          ? item.customization?.chicken.image || ''
                          : isDeal
                          ? item.deal?.image || ''
                          : item.product?.image || ''
                      }
                      alt="Product"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    {isCustom && (
                      <span className="text-[9px] font-mono font-black uppercase text-ffc-gold bg-ffc-gold/15 px-2 py-0.5 rounded border border-ffc-gold/30 inline-block mb-1">
                        CUSTOM LAB CREATION
                      </span>
                    )}

                    <h3 className="text-base font-black font-display uppercase tracking-tight text-white">
                      {isCustom
                        ? item.customization?.creationName
                        : isDeal
                        ? item.deal?.title
                        : item.product?.name}
                    </h3>

                    {isCustom && item.customization && (
                      <p className="text-xs text-ffc-cream/70 font-sans mt-0.5">
                        {item.customization.crunch.name} • {item.customization.flavour.name} • L0
                        {item.customization.spice.level} • {item.customization.sauce.name}
                      </p>
                    )}

                    <span className="text-sm font-black font-display text-ffc-gold mt-1 block">
                      {formatPrice(item.unitPrice)} each
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  <div className="flex items-center gap-2 bg-ffc-surface px-2.5 py-1 rounded-xl border border-ffc-cardBorder">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="w-6 h-6 rounded bg-ffc-card hover:bg-ffc-cardHover flex items-center justify-center text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-mono font-bold text-white w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="w-6 h-6 rounded bg-ffc-gold text-ffc-black flex items-center justify-center font-bold"
                    >
                      <Plus className="w-3 h-3 stroke-[3]" />
                    </button>
                  </div>

                  <span className="text-base font-black font-display text-white">
                    {formatPrice(item.totalPrice)}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeItem(item.cartItemId)}
                    className="p-2 text-ffc-smoke hover:text-ffc-red transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Calculations Ticket (5 cols) */}
        <div className="lg:col-span-5 bg-ffc-surface border border-ffc-cardBorder rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <h2 className="text-lg font-black font-display text-white uppercase tracking-tight pb-3 border-b border-ffc-cardBorder">
            ORDER SUMMARY
          </h2>

          <div className="space-y-2 text-xs font-mono text-ffc-cream/80">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(summary.subtotal)}</span>
            </div>
            {summary.discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Coupon ({summary.discountCode})</span>
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
              <span>Delivery</span>
              <span>{summary.deliveryFee === 0 ? 'FREE' : formatPrice(summary.deliveryFee)}</span>
            </div>

            <div className="flex justify-between text-lg font-black font-display text-white pt-3 border-t border-white/10">
              <span className="text-ffc-gold">GRAND TOTAL</span>
              <span className="text-ffc-gold">{formatPrice(summary.grandTotal)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => router.push('/checkout')}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-ffc-red via-ffc-orange to-ffc-gold text-white font-black font-display text-sm uppercase tracking-wider shadow-fire hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>PROCEED TO CHECKOUT</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
}

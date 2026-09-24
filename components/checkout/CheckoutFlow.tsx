'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPrice, generateOrderId } from '@/lib/utils';
import { soundManager } from '@/lib/sound';
import {
  Check,
  CreditCard,
  Smartphone,
  Banknote,
  MapPin,
  User,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Flame,
} from 'lucide-react';

export function CheckoutFlow() {
  const router = useRouter();
  const { items, summary, orderType, clearCart, deliveryPincode } = useCart();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form States
  const [name, setName] = useState('Rahul Verma');
  const [phone, setPhone] = useState('9876543210');
  const [email, setEmail] = useState('rahul.verma@example.com');

  const [flat, setFlat] = useState('Apartment 402, Tower B');
  const [street, setStreet] = useState('Indiranagar 100ft Road');
  const [city, setCity] = useState('Bengaluru');
  const [pincode, setPincode] = useState(deliveryPincode || '560038');
  const [instructions, setInstructions] = useState('Ring doorbell and leave at door');

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('rahul@okaxis');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-ffc-card rounded-3xl border border-ffc-cardBorder space-y-4">
        <span className="text-5xl block animate-bounce">🍗</span>
        <h2 className="text-xl font-black font-display text-white uppercase">
          YOUR CART IS EMPTY
        </h2>
        <p className="text-xs text-ffc-cream/70">
          Add some crispy chicken or create a custom recipe to proceed with checkout.
        </p>
        <button
          onClick={() => router.push('/menu')}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-ffc-red to-ffc-gold text-white font-black font-display text-xs uppercase tracking-wider shadow-fire"
        >
          EXPLORE MENU
        </button>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    soundManager.playAchievementFanfare();

    const orderId = generateOrderId();
    const orderData = {
      orderId,
      createdAt: new Date().toISOString(),
      estimatedDeliveryTime: '28-35 Mins',
      status: 'received',
      items,
      subtotal: summary.subtotal,
      tax: summary.gstTax,
      deliveryFee: summary.deliveryFee,
      discount: summary.discount,
      grandTotal: summary.grandTotal,
      deliveryAddress: {
        fullName: name,
        phone,
        street: `${flat}, ${street}`,
        city,
        pincode,
        landmark: instructions,
      },
      orderType,
      rider: {
        name: 'Vikas Kumar',
        phone: '+91 98450 19283',
        vehicle: 'Ather 450X (EV)',
        photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
        rating: 4.9,
      },
    };

    localStorage.setItem(`ffc_order_${orderId}`, JSON.stringify(orderData));
    localStorage.setItem('ffc_latest_order_id', orderId);

    setTimeout(() => {
      clearCart();
      router.push(`/track/${orderId}`);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Stepper Header */}
      <div className="grid grid-cols-3 gap-2 pb-8 border-b border-ffc-cardBorder/60 mb-8">
        {[
          { num: 1, title: '01 DETAILS', subtitle: 'Contact Info' },
          { num: 2, title: '02 LOCATION', subtitle: orderType === 'delivery' ? 'Address' : 'Pickup Hub' },
          { num: 3, title: '03 PAYMENT', subtitle: 'UPI / Card' },
        ].map((s) => {
          const isCurrent = step === s.num;
          const isDone = step > s.num;
          return (
            <div
              key={s.num}
              className={`p-3 rounded-2xl border transition-all text-left ${
                isCurrent
                  ? 'bg-ffc-surface border-ffc-gold shadow-gold'
                  : isDone
                  ? 'bg-ffc-card border-emerald-500/40 text-emerald-400'
                  : 'bg-ffc-card/40 border-white/5 opacity-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white uppercase">{s.title}</span>
                {isDone && <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />}
              </div>
              <span className="text-[10px] text-ffc-cream/60 font-sans block mt-0.5 truncate">
                {s.subtitle}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 bg-ffc-card/70 border border-ffc-cardBorder rounded-3xl p-6 sm:p-8 space-y-6">
          {/* STEP 1: CONTACT DETAILS */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-ffc-gold" />
                <h2 className="text-lg font-black font-display uppercase tracking-tight text-white">
                  CUSTOMER CONTACT DETAILS
                </h2>
              </div>

              <div className="space-y-3 font-sans text-xs">
                <div>
                  <label className="text-[11px] font-mono uppercase text-ffc-smoke block mb-1">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-ffc-black border border-ffc-cardBorder rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-ffc-gold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-ffc-smoke block mb-1">
                      PHONE NUMBER (FOR RIDER CALLS)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-ffc-black border border-ffc-cardBorder rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-ffc-gold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-ffc-smoke block mb-1">
                      EMAIL ADDRESS (INVOICE & TRACKING)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-ffc-black border border-ffc-cardBorder rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-ffc-gold"
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full mt-4 py-3.5 rounded-xl bg-ffc-gold hover:bg-ffc-goldLight text-ffc-black font-black font-display text-xs uppercase tracking-wider shadow-gold flex items-center justify-center gap-2"
              >
                <span>CONTINUE TO DELIVERY DETAILS</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          )}

          {/* STEP 2: ADDRESS */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-ffc-gold" />
                <h2 className="text-lg font-black font-display uppercase tracking-tight text-white">
                  {orderType === 'delivery' ? 'DELIVERY DESTINATION' : 'STORE PICKUP LOCATION'}
                </h2>
              </div>

              {orderType === 'delivery' ? (
                <div className="space-y-3 font-sans text-xs">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-ffc-smoke block mb-1">
                      FLAT / HOUSE NO / BUILDING
                    </label>
                    <input
                      type="text"
                      value={flat}
                      onChange={(e) => setFlat(e.target.value)}
                      required
                      className="w-full bg-ffc-black border border-ffc-cardBorder rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-ffc-gold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-ffc-smoke block mb-1">
                      STREET / LOCALITY / AREA
                    </label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      required
                      className="w-full bg-ffc-black border border-ffc-cardBorder rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-ffc-gold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono uppercase text-ffc-smoke block mb-1">
                        CITY
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="w-full bg-ffc-black border border-ffc-cardBorder rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-ffc-gold"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase text-ffc-smoke block mb-1">
                        PINCODE
                      </label>
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        required
                        className="w-full bg-ffc-black border border-ffc-cardBorder rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-ffc-gold font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-ffc-smoke block mb-1">
                      DELIVERY INSTRUCTIONS (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      placeholder="e.g. Leave with security, ring bell twice"
                      className="w-full bg-ffc-black border border-ffc-cardBorder rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-ffc-gold"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-ffc-surface border border-ffc-cardBorder space-y-2">
                  <span className="text-xs font-bold text-ffc-gold uppercase font-mono block">
                    PICKUP AT FLAGSHIP INDIRANAGAR LAB
                  </span>
                  <p className="text-xs text-ffc-cream/80">
                    Plot 482, 100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru.
                  </p>
                  <p className="text-[11px] text-emerald-400 font-mono">
                    ⚡ Prepared fresh within 15 minutes of ordering.
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 rounded-xl bg-ffc-surface border border-ffc-cardBorder text-ffc-smoke text-xs font-mono font-bold"
                >
                  BACK
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 py-3.5 rounded-xl bg-ffc-gold hover:bg-ffc-goldLight text-ffc-black font-black font-display text-xs uppercase tracking-wider shadow-gold flex items-center justify-center gap-2"
                >
                  <span>CONTINUE TO PAYMENT</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-ffc-gold" />
                <h2 className="text-lg font-black font-display uppercase tracking-tight text-white">
                  SELECT PAYMENT METHOD
                </h2>
              </div>

              <div className="space-y-3">
                {/* UPI Option */}
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-ffc-surface border-ffc-gold shadow-gold ring-1 ring-ffc-gold/50'
                      : 'bg-ffc-card/80 border-ffc-cardBorder hover:border-ffc-gold/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-ffc-gold" />
                      <div>
                        <span className="text-sm font-bold text-white block">
                          Instant UPI (GPay, PhonePe, Paytm)
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono">
                          Zero transaction fee • Fastest checkout
                        </span>
                      </div>
                    </div>
                    {paymentMethod === 'upi' && (
                      <span className="w-4 h-4 rounded-full bg-ffc-gold text-ffc-black flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="mt-3 pt-3 border-t border-white/5 flex gap-2">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        className="flex-1 bg-ffc-black border border-ffc-cardBorder rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-ffc-gold"
                      />
                    </div>
                  )}
                </div>

                {/* Card Option */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-ffc-surface border-ffc-gold shadow-gold ring-1 ring-ffc-gold/50'
                      : 'bg-ffc-card/80 border-ffc-cardBorder hover:border-ffc-gold/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-ffc-orange" />
                      <div>
                        <span className="text-sm font-bold text-white block">
                          Credit / Debit Cards
                        </span>
                        <span className="text-[10px] text-ffc-smoke font-mono">
                          Visa, MasterCard, RuPay
                        </span>
                      </div>
                    </div>
                    {paymentMethod === 'card' && (
                      <span className="w-4 h-4 rounded-full bg-ffc-gold text-ffc-black flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-ffc-surface border-ffc-gold shadow-gold ring-1 ring-ffc-gold/50'
                      : 'bg-ffc-card/80 border-ffc-cardBorder hover:border-ffc-gold/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Banknote className="w-5 h-5 text-emerald-400" />
                      <div>
                        <span className="text-sm font-bold text-white block">Cash On Delivery</span>
                        <span className="text-[10px] text-ffc-smoke font-mono">
                          Pay cash or scan rider QR upon delivery
                        </span>
                      </div>
                    </div>
                    {paymentMethod === 'cod' && (
                      <span className="w-4 h-4 rounded-full bg-ffc-gold text-ffc-black flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-3 rounded-xl bg-ffc-surface border border-ffc-cardBorder text-ffc-smoke text-xs font-mono font-bold"
                >
                  BACK
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handlePlaceOrder}
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-ffc-red via-ffc-orange to-ffc-gold text-white font-black font-display text-sm uppercase tracking-wider shadow-fire hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>IGNITING KITCHEN FRYERS...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-current" />
                      <span>PLACE ORDER & TRACK LIVE ({formatPrice(summary.grandTotal)})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Summary Ticket (5 cols) */}
        <div className="lg:col-span-5 bg-ffc-surface border border-ffc-cardBorder rounded-3xl p-6 shadow-2xl space-y-5">
          <div className="pb-3 border-b border-ffc-cardBorder/60">
            <span className="text-[10px] font-mono uppercase text-ffc-gold block">
              SUMMARY SPECS
            </span>
            <h3 className="text-lg font-black font-display text-white uppercase tracking-tight">
              ORDER BREAKDOWN ({items.length} ITEMS)
            </h3>
          </div>

          {/* Items Preview */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
            {items.map((item) => (
              <div
                key={item.cartItemId}
                className="flex items-center justify-between gap-2 text-xs font-sans"
              >
                <div className="min-w-0 flex-1">
                  <span className="text-white font-bold block truncate">
                    {item.quantity}x{' '}
                    {item.type === 'custom_chicken'
                      ? item.customization?.creationName
                      : item.type === 'deal'
                      ? item.deal?.title
                      : item.product?.name}
                  </span>
                  {item.type === 'custom_chicken' && item.customization && (
                    <span className="text-[10px] text-ffc-cream/60 block">
                      {item.customization.flavour.name} • L0{item.customization.spice.level}
                    </span>
                  )}
                </div>
                <span className="font-mono text-ffc-gold">{formatPrice(item.totalPrice)}</span>
              </div>
            ))}
          </div>

          {/* Calculations */}
          <div className="space-y-1.5 text-xs font-mono text-ffc-cream/80 pt-3 border-t border-white/5">
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
              <span>Packaging</span>
              <span>{formatPrice(summary.restaurantPackaging)}</span>
            </div>
            <div className="flex justify-between text-ffc-smoke">
              <span>Delivery Fee</span>
              <span>{summary.deliveryFee === 0 ? 'FREE' : formatPrice(summary.deliveryFee)}</span>
            </div>

            <div className="flex justify-between text-base font-black font-display text-white pt-2 border-t border-white/10">
              <span className="text-ffc-gold">TOTAL TO PAY</span>
              <span className="text-ffc-gold">{formatPrice(summary.grandTotal)}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-ffc-card border border-white/5 flex items-center gap-2 text-[11px] font-mono text-ffc-cream/70">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>256-Bit Encrypted Secure Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

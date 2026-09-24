'use client';

import React from 'react';
import Image from 'next/image';
import { MEAL_ADDONS } from '@/data/customizer-options';
import { useCustomizer } from '@/context/CustomizerContext';
import { formatPrice } from '@/lib/utils';
import { Check, Sparkles, Plus, Minus } from 'lucide-react';

export function StepMeal() {
  const {
    chicken,
    flavour,
    spice,
    selectedSides,
    selectedDrink,
    selectedExtraDip,
    selectedDessert,
    toggleSide,
    setSelectedDrink,
    setSelectedExtraDip,
    setSelectedDessert,
    creationName,
    setCreationName,
    quantity,
    setQuantity,
  } = useCustomizer();

  const sidesList = MEAL_ADDONS.filter((a) => a.category === 'sides');
  const drinksList = MEAL_ADDONS.filter((a) => a.category === 'drinks');
  const dipsList = MEAL_ADDONS.filter((a) => a.category === 'dips');
  const dessertsList = MEAL_ADDONS.filter((a) => a.category === 'desserts');

  const defaultNameSuggestion = `${spice.name} ${flavour.name} ${chicken.name}`;

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[11px] font-mono text-ffc-gold uppercase tracking-wider font-bold block mb-1">
          STEP 06 OF 06
        </span>
        <h2 className="text-xl sm:text-2xl font-black font-display text-white uppercase tracking-tight">
          BUILD YOUR MEAL & NAME YOUR MASTERPIECE
        </h2>
        <p className="text-xs sm:text-sm text-ffc-cream/70 font-sans mt-1">
          Pair with seasoned crinkle fries, icy beverages, molten desserts, and crown your recipe.
        </p>
      </div>

      {/* Creation Name Input & Suggestions */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-ffc-card to-ffc-surface border border-ffc-cardBorder shadow-lg">
        <label className="text-xs font-mono font-bold text-ffc-gold uppercase tracking-wider block mb-1.5">
          WHAT SHOULD WE CALL YOUR CREATION?
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={creationName}
            onChange={(e) => setCreationName(e.target.value)}
            placeholder={defaultNameSuggestion}
            className="flex-1 bg-ffc-black/80 border border-ffc-cardBorder rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-ffc-gold font-display"
          />
          <button
            type="button"
            onClick={() => setCreationName(defaultNameSuggestion)}
            className="px-3 py-2 bg-ffc-card hover:bg-ffc-cardHover border border-ffc-cardBorder rounded-xl text-xs font-mono text-ffc-cream flex items-center gap-1 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-ffc-gold" />
            Auto Name
          </button>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-ffc-card/70 border border-ffc-cardBorder">
        <div>
          <span className="text-xs font-bold text-white uppercase block">MEAL QUANTITY</span>
          <span className="text-[11px] text-ffc-cream/60">How many orders of this creation?</span>
        </div>
        <div className="flex items-center gap-3 bg-ffc-surface px-2.5 py-1.5 rounded-xl border border-ffc-cardBorder">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-7 h-7 rounded-lg bg-ffc-card hover:bg-ffc-cardHover flex items-center justify-center text-white"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-sm font-mono font-bold text-white w-6 text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="w-7 h-7 rounded-lg bg-ffc-gold hover:bg-ffc-goldLight text-ffc-black flex items-center justify-center font-bold"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>
      </div>

      {/* SIDES SELECTION */}
      <div className="space-y-2">
        <h3 className="text-xs font-mono font-bold text-ffc-orange uppercase tracking-wider">
          ADD SIDES (OPTIONAL)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {sidesList.map((item) => {
            const isSelected = selectedSides.some((s) => s.id === item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleSide(item)}
                className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'bg-ffc-gold/15 border-ffc-gold text-white shadow-sm'
                    : 'bg-ffc-card/70 border-ffc-cardBorder hover:border-ffc-gold/40'
                }`}
              >
                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-white block truncate">{item.name}</span>
                  <span className="text-[11px] font-mono text-ffc-gold block">
                    +{formatPrice(item.price)}
                  </span>
                </div>
                {isSelected && (
                  <span className="w-4 h-4 rounded-full bg-ffc-gold text-ffc-black flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* DRINKS SELECTION */}
      <div className="space-y-2">
        <h3 className="text-xs font-mono font-bold text-ffc-orange uppercase tracking-wider">
          CHOOSE A BEVERAGE
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {drinksList.map((item) => {
            const isSelected = selectedDrink?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedDrink(isSelected ? null : item)}
                className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'bg-ffc-gold/15 border-ffc-gold text-white shadow-sm'
                    : 'bg-ffc-card/70 border-ffc-cardBorder hover:border-ffc-gold/40'
                }`}
              >
                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-white block truncate">{item.name}</span>
                  <span className="text-[11px] font-mono text-ffc-gold block">
                    +{formatPrice(item.price)}
                  </span>
                </div>
                {isSelected && (
                  <span className="w-4 h-4 rounded-full bg-ffc-gold text-ffc-black flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* DESSERT & EXTRA DIPS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Extra Dips */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold text-ffc-orange uppercase tracking-wider">
            EXTRA DIP CUP
          </h3>
          {dipsList.map((item) => {
            const isSelected = selectedExtraDip?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedExtraDip(isSelected ? null : item)}
                className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'bg-ffc-gold/15 border-ffc-gold text-white'
                    : 'bg-ffc-card/70 border-ffc-cardBorder hover:border-ffc-gold/40'
                }`}
              >
                <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-white block truncate">{item.name}</span>
                  <span className="text-[10px] font-mono text-ffc-gold">
                    +{formatPrice(item.price)}
                  </span>
                </div>
                {isSelected && (
                  <span className="w-4 h-4 rounded-full bg-ffc-gold text-ffc-black flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Dessert */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold text-ffc-orange uppercase tracking-wider">
            HOT DESSERT
          </h3>
          {dessertsList.map((item) => {
            const isSelected = selectedDessert?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedDessert(isSelected ? null : item)}
                className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'bg-ffc-gold/15 border-ffc-gold text-white'
                    : 'bg-ffc-card/70 border-ffc-cardBorder hover:border-ffc-gold/40'
                }`}
              >
                <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-white block truncate">{item.name}</span>
                  <span className="text-[10px] font-mono text-ffc-gold">
                    +{formatPrice(item.price)}
                  </span>
                </div>
                {isSelected && (
                  <span className="w-4 h-4 rounded-full bg-ffc-gold text-ffc-black flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  ChickenBaseOption,
  CrunchOption,
  FlavourOption,
  SpiceOption,
  SauceOption,
  MealAddon,
  ChickenCustomization,
} from '@/types';
import {
  CHICKEN_BASES,
  CRUNCH_OPTIONS,
  FLAVOUR_OPTIONS,
  SPICE_LEVELS,
  SAUCE_OPTIONS,
} from '@/data/customizer-options';
import { calculateCustomizationPrice, PriceBreakdown } from '@/lib/pricing';
import { generateCreationId } from '@/lib/utils';
import { soundManager } from '@/lib/sound';

interface CustomizerContextType {
  currentStep: number;
  chicken: ChickenBaseOption;
  crunch: CrunchOption;
  flavour: FlavourOption;
  spice: SpiceOption;
  sauce: SauceOption;
  saucePlacement: 'drizzled' | 'on-the-side' | 'double-dip';
  selectedSides: MealAddon[];
  selectedDrink: MealAddon | null;
  selectedExtraDip: MealAddon | null;
  selectedDessert: MealAddon | null;
  creationName: string;
  quantity: number;
  creationId: string;
  priceBreakdown: PriceBreakdown;
  badges: string[];
  isRevealModalOpen: boolean;

  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setChicken: (chicken: ChickenBaseOption) => void;
  setCrunch: (crunch: CrunchOption) => void;
  setFlavour: (flavour: FlavourOption) => void;
  setSpice: (spice: SpiceOption) => void;
  setSauce: (sauce: SauceOption) => void;
  setSaucePlacement: (placement: 'drizzled' | 'on-the-side' | 'double-dip') => void;
  toggleSide: (side: MealAddon) => void;
  setSelectedDrink: (drink: MealAddon | null) => void;
  setSelectedExtraDip: (dip: MealAddon | null) => void;
  setSelectedDessert: (dessert: MealAddon | null) => void;
  setCreationName: (name: string) => void;
  setQuantity: (qty: number) => void;
  resetCustomizer: () => void;
  openRevealModal: () => void;
  closeRevealModal: () => void;
  getCustomizationObject: () => ChickenCustomization;
  loadCustomization: (customization: ChickenCustomization) => void;
}

const CustomizerContext = createContext<CustomizerContextType | undefined>(undefined);

export function CustomizerProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [chicken, setChickenState] = useState<ChickenBaseOption>(CHICKEN_BASES[0]);
  const [crunch, setCrunchState] = useState<CrunchOption>(CRUNCH_OPTIONS[1]);
  const [flavour, setFlavourState] = useState<FlavourOption>(FLAVOUR_OPTIONS[0]);
  const [spice, setSpiceState] = useState<SpiceOption>(SPICE_LEVELS[2]);
  const [sauce, setSauceState] = useState<SauceOption>(SAUCE_OPTIONS[0]);
  const [saucePlacement, setSaucePlacementState] = useState<'drizzled' | 'on-the-side' | 'double-dip'>('drizzled');
  const [selectedSides, setSelectedSides] = useState<MealAddon[]>([]);
  const [selectedDrink, setSelectedDrinkState] = useState<MealAddon | null>(null);
  const [selectedExtraDip, setSelectedExtraDipState] = useState<MealAddon | null>(null);
  const [selectedDessert, setSelectedDessertState] = useState<MealAddon | null>(null);
  const [creationName, setCreationNameState] = useState<string>('');
  const [quantity, setQuantityState] = useState<number>(1);
  const [creationId, setCreationId] = useState<string>(() => generateCreationId());
  const [isRevealModalOpen, setIsRevealModalOpen] = useState<boolean>(false);

  // Compute Badges
  const badges: string[] = [];
  if (spice.level === 5) badges.push('FIRE STARTER 🔥');
  if (crunch.id === 'double' || crunch.id === 'extra') badges.push('CRUNCH MASTER 💥');
  if (saucePlacement === 'double-dip' || selectedExtraDip) badges.push('SAUCE BOSS 🫙');
  if (selectedSides.length > 0 && selectedDrink) badges.push('FEAST ARCHITECT 🍟');
  if (badges.length === 0) badges.push('FLAVOUR CRAFTER ✨');

  // Compute price breakdown
  const priceBreakdown = calculateCustomizationPrice({
    chicken,
    crunch,
    flavour,
    spice,
    sauce,
    sides: selectedSides,
    drink: selectedDrink || undefined,
    extraDip: selectedExtraDip || undefined,
    dessert: selectedDessert || undefined,
    quantity,
  });

  const setStep = (step: number) => {
    soundManager.playStepChime();
    setCurrentStep(Math.max(1, Math.min(6, step)));
  };

  const nextStep = () => {
    if (currentStep < 6) {
      soundManager.playStepChime();
      setCurrentStep((prev) => prev + 1);
    } else {
      openRevealModal();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      soundManager.playSelect();
      setCurrentStep((prev) => prev - 1);
    }
  };

  const setChicken = (newChicken: ChickenBaseOption) => {
    soundManager.playCrunch();
    setChickenState(newChicken);
  };

  const setCrunch = (newCrunch: CrunchOption) => {
    soundManager.playCrunch();
    setCrunchState(newCrunch);
  };

  const setFlavour = (newFlavour: FlavourOption) => {
    soundManager.playFireWhoosh();
    setFlavourState(newFlavour);
  };

  const setSpice = (newSpice: SpiceOption) => {
    if (newSpice.level >= 4) {
      soundManager.playFireWhoosh();
    } else {
      soundManager.playSelect();
    }
    setSpiceState(newSpice);
  };

  const setSauce = (newSauce: SauceOption) => {
    soundManager.playSelect();
    setSauceState(newSauce);
  };

  const setSaucePlacement = (placement: 'drizzled' | 'on-the-side' | 'double-dip') => {
    soundManager.playSelect();
    setSaucePlacementState(placement);
  };

  const toggleSide = (side: MealAddon) => {
    soundManager.playSelect();
    setSelectedSides((prev) => {
      const exists = prev.some((s) => s.id === side.id);
      if (exists) {
        return prev.filter((s) => s.id !== side.id);
      } else {
        return [...prev, side];
      }
    });
  };

  const setSelectedDrink = (drink: MealAddon | null) => {
    soundManager.playSelect();
    setSelectedDrinkState(drink);
  };

  const setSelectedExtraDip = (dip: MealAddon | null) => {
    soundManager.playSelect();
    setSelectedExtraDipState(dip);
  };

  const setSelectedDessert = (dessert: MealAddon | null) => {
    soundManager.playSelect();
    setSelectedDessertState(dessert);
  };

  const setCreationName = (name: string) => {
    setCreationNameState(name);
  };

  const setQuantity = (qty: number) => {
    setQuantityState(Math.max(1, qty));
  };

  const openRevealModal = () => {
    soundManager.playAchievementFanfare();
    setIsRevealModalOpen(true);
  };

  const closeRevealModal = () => {
    setIsRevealModalOpen(false);
  };

  const resetCustomizer = () => {
    setCurrentStep(1);
    setChickenState(CHICKEN_BASES[0]);
    setCrunchState(CRUNCH_OPTIONS[1]);
    setFlavourState(FLAVOUR_OPTIONS[0]);
    setSpiceState(SPICE_LEVELS[2]);
    setSauceState(SAUCE_OPTIONS[0]);
    setSaucePlacementState('drizzled');
    setSelectedSides([]);
    setSelectedDrinkState(null);
    setSelectedExtraDipState(null);
    setSelectedDessertState(null);
    setCreationNameState('');
    setQuantityState(1);
    setCreationId(generateCreationId());
    setIsRevealModalOpen(false);
  };

  const getCustomizationObject = (): ChickenCustomization => {
    const finalName = creationName.trim()
      ? creationName.trim()
      : `${spice.name} ${flavour.name} ${chicken.name}`;

    return {
      id: creationId,
      creationName: finalName,
      chicken,
      crunch,
      flavour,
      spice,
      sauce,
      saucePlacement,
      sides: selectedSides,
      drink: selectedDrink || undefined,
      extraDip: selectedExtraDip || undefined,
      dessert: selectedDessert || undefined,
      quantity,
      totalPrice: priceBreakdown.subtotal,
      createdAt: new Date().toISOString(),
      badges,
    };
  };

  const loadCustomization = (customization: ChickenCustomization) => {
    if (customization.chicken) setChickenState(customization.chicken);
    if (customization.crunch) setCrunchState(customization.crunch);
    if (customization.flavour) setFlavourState(customization.flavour);
    if (customization.spice) setSpiceState(customization.spice);
    if (customization.sauce) setSauceState(customization.sauce);
    if (customization.saucePlacement) setSaucePlacementState(customization.saucePlacement);
    if (customization.sides) setSelectedSides(customization.sides);
    if (customization.drink) setSelectedDrinkState(customization.drink);
    if (customization.extraDip) setSelectedExtraDipState(customization.extraDip);
    if (customization.dessert) setSelectedDessertState(customization.dessert);
    if (customization.creationName) setCreationNameState(customization.creationName);
    if (customization.quantity) setQuantityState(customization.quantity);
    if (customization.id) setCreationId(customization.id);
  };

  return (
    <CustomizerContext.Provider
      value={{
        currentStep,
        chicken,
        crunch,
        flavour,
        spice,
        sauce,
        saucePlacement,
        selectedSides,
        selectedDrink,
        selectedExtraDip,
        selectedDessert,
        creationName,
        quantity,
        creationId,
        priceBreakdown,
        badges,
        isRevealModalOpen,
        setStep,
        nextStep,
        prevStep,
        setChicken,
        setCrunch,
        setFlavour,
        setSpice,
        setSauce,
        setSaucePlacement,
        toggleSide,
        setSelectedDrink,
        setSelectedExtraDip,
        setSelectedDessert,
        setCreationName,
        setQuantity,
        resetCustomizer,
        openRevealModal,
        closeRevealModal,
        getCustomizationObject,
        loadCustomization,
      }}
    >
      {children}
    </CustomizerContext.Provider>
  );
}

export function useCustomizer() {
  const context = useContext(CustomizerContext);
  if (!context) {
    throw new Error('useCustomizer must be used within a CustomizerProvider');
  }
  return context;
}

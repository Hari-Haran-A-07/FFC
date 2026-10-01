'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useCustomizer } from '@/context/CustomizerContext';
import {
  CHICKEN_BASES,
  CRUNCH_OPTIONS,
  FLAVOUR_OPTIONS,
  SPICE_LEVELS,
  SAUCE_OPTIONS,
  MEAL_ADDONS,
} from '@/data/customizer-options';
import { soundManager } from '@/lib/sound';
import {
  Sparkles,
  Bot,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Zap,
  Flame,
  CheckCircle2,
  X,
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';

interface RecipePreset {
  id: string;
  name: string;
  badge: string;
  description: string;
  chickenId: string;
  crunchId: string;
  flavourId: string;
  spiceLevel: number;
  sauceId: string;
  saucePlacement: 'drizzled' | 'on-the-side' | 'double-dip';
  sideIds: string[];
  drinkId?: string;
  dipId?: string;
  dessertId?: string;
  creationName: string;
}

const CHEF_PRESETS: RecipePreset[] = [
  {
    id: 'inferno-beast',
    name: 'THE INFERNO BEAST',
    badge: '🔥 LEVEL 5 FIRE',
    description: 'Ghost Fire dust, double crunch, hot BBQ glaze & crinkle fries.',
    chickenId: 'strips',
    crunchId: 'double',
    flavourId: 'ghost-fire',
    spiceLevel: 5,
    sauceId: 'fire-bbq',
    saucePlacement: 'drizzled',
    sideIds: ['crinkle-fries'],
    drinkId: 'coke-zero',
    creationName: 'THE INFERNO BEAST 🌋',
  },
  {
    id: 'golden-honey-glaze',
    name: 'GOLDEN HONEY CRUNCH',
    badge: '🍯 SWEET HEAT',
    description: 'Crispy bone-in cut, sweet honey glaze & double garlic herb dip.',
    chickenId: 'pieces',
    crunchId: 'extra',
    flavourId: 'honey-heat',
    spiceLevel: 3,
    sauceId: 'garlic-herb-mayo',
    saucePlacement: 'double-dip',
    sideIds: ['cheesy-bites'],
    drinkId: 'lemon-iced-tea',
    creationName: 'GOLDEN HONEY CROWN 👑',
  },
  {
    id: 'blistered-peri-wings',
    name: 'BLISTERED PERI FEAST',
    badge: '🌶️ CITRUS PERI',
    description: 'Crisp blistered wings, zesty peri dust, jalapeno dip & lava cake.',
    chickenId: 'wings',
    crunchId: 'classic',
    flavourId: 'peri-peri',
    spiceLevel: 4,
    sauceId: 'jalapeno-cream',
    saucePlacement: 'on-the-side',
    sideIds: ['peri-peri-fries'],
    drinkId: 'lemon-iced-tea',
    dessertId: 'choco-lava',
    creationName: 'PERI VOLCANO BOX 💥',
  },
];

export function AutoCraftSimulator() {
  const {
    setStep,
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
    openRevealModal,
    resetCustomizer,
  } = useCustomizer();

  const [modalOpen, setModalOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<1 | 2>(1);
  const [currentAutoStep, setCurrentAutoStep] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const autoTimerRef = useRef<NodeJS.Timeout | null>(null);

  const stopAutomation = () => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    setIsRunning(false);
    setIsPaused(false);
    setCurrentAutoStep(0);
    setStatusMessage('');
  };

  const runAutomationForPreset = (preset: RecipePreset) => {
    setModalOpen(false);
    resetCustomizer();
    setIsRunning(true);
    setIsPaused(false);
    setCurrentAutoStep(1);

    const stepDelay = 1300 / speedMultiplier;

    // Step 01: Set Chicken Cut
    setStatusMessage(`Step 1/6: Calibrating Chicken Cut → ${preset.chickenId.toUpperCase()}`);
    setStep(1);
    const chosenChicken = CHICKEN_BASES.find((c) => c.id === preset.chickenId) || CHICKEN_BASES[0];
    setChicken(chosenChicken);

    autoTimerRef.current = setTimeout(() => {
      // Step 02: Set Crunch
      setCurrentAutoStep(2);
      setStatusMessage(`Step 2/6: Setting Ultrasonic Crunch Factor...`);
      setStep(2);
      const chosenCrunch = CRUNCH_OPTIONS.find((c) => c.id === preset.crunchId) || CRUNCH_OPTIONS[1];
      setCrunch(chosenCrunch);

      autoTimerRef.current = setTimeout(() => {
        // Step 03: Set Flavour
        setCurrentAutoStep(3);
        setStatusMessage(`Step 3/6: Infusing Signature Flavor Dusting...`);
        setStep(3);
        const chosenFlavour = FLAVOUR_OPTIONS.find((f) => f.id === preset.flavourId) || FLAVOUR_OPTIONS[0];
        setFlavour(chosenFlavour);

        autoTimerRef.current = setTimeout(() => {
          // Step 04: Set Spice Level
          setCurrentAutoStep(4);
          setStatusMessage(`Step 4/6: Calibrating Heat Meter Level 0${preset.spiceLevel}...`);
          setStep(4);
          const chosenSpice = SPICE_LEVELS.find((s) => s.level === preset.spiceLevel) || SPICE_LEVELS[2];
          setSpice(chosenSpice);

          autoTimerRef.current = setTimeout(() => {
            // Step 05: Set Sauce
            setCurrentAutoStep(5);
            setStatusMessage(`Step 5/6: Applying Glaze & Sauce Technique...`);
            setStep(5);
            const chosenSauce = SAUCE_OPTIONS.find((s) => s.id === preset.sauceId) || SAUCE_OPTIONS[0];
            setSauce(chosenSauce);
            setSaucePlacement(preset.saucePlacement);

            autoTimerRef.current = setTimeout(() => {
              // Step 06: Build Meal & Name
              setCurrentAutoStep(6);
              setStatusMessage(`Step 6/6: Assembling Feast & Generating Recipe Certificate...`);
              setStep(6);

              // Set sides
              if (preset.sideIds.length > 0) {
                preset.sideIds.forEach((sId) => {
                  const side = MEAL_ADDONS.find((s) => s.id === sId && s.category === 'sides');
                  if (side) toggleSide(side);
                });
              }

              // Set drink
              if (preset.drinkId) {
                const drink = MEAL_ADDONS.find((d) => d.id === preset.drinkId && d.category === 'drinks');
                if (drink) setSelectedDrink(drink);
              }

              // Set dessert
              if (preset.dessertId) {
                const dessert = MEAL_ADDONS.find((d) => d.id === preset.dessertId && d.category === 'desserts');
                if (dessert) setSelectedDessert(dessert);
              }

              // Set Name
              setCreationName(preset.creationName);

              // Final Reveal Delay
              autoTimerRef.current = setTimeout(() => {
                setIsRunning(false);
                setCurrentAutoStep(0);
                setStatusMessage('Masterpiece Complete! Revealing Creation...');
                openRevealModal();
              }, 1100 / speedMultiplier);
            }, stepDelay);
          }, stepDelay);
        }, stepDelay);
      }, stepDelay);
    }, stepDelay);
  };

  const handleRandomAIBuild = () => {
    const sidesList = MEAL_ADDONS.filter((a) => a.category === 'sides');
    const drinksList = MEAL_ADDONS.filter((a) => a.category === 'drinks');

    const randomChicken = CHICKEN_BASES[Math.floor(Math.random() * CHICKEN_BASES.length)];
    const randomCrunch = CRUNCH_OPTIONS[Math.floor(Math.random() * CRUNCH_OPTIONS.length)];
    const randomFlavour = FLAVOUR_OPTIONS[Math.floor(Math.random() * FLAVOUR_OPTIONS.length)];
    const randomSpice = SPICE_LEVELS[Math.floor(Math.random() * SPICE_LEVELS.length)];
    const randomSauce = SAUCE_OPTIONS[Math.floor(Math.random() * SAUCE_OPTIONS.length)];
    const placements: ('drizzled' | 'on-the-side' | 'double-dip')[] = ['drizzled', 'on-the-side', 'double-dip'];
    const randomPlacement = placements[Math.floor(Math.random() * placements.length)];
    const randomSide = sidesList[Math.floor(Math.random() * sidesList.length)];
    const randomDrink = drinksList[Math.floor(Math.random() * drinksList.length)];

    const randomPreset: RecipePreset = {
      id: `ai-${Date.now()}`,
      name: `AI LAB CREATION #${Math.floor(Math.random() * 900 + 100)}`,
      badge: '⚡ AI ALGORITHM',
      description: 'Procedurally balanced flavor-to-crunch pairing.',
      chickenId: randomChicken.id,
      crunchId: randomCrunch.id,
      flavourId: randomFlavour.id,
      spiceLevel: randomSpice.level,
      sauceId: randomSauce.id,
      saucePlacement: randomPlacement,
      sideIds: [randomSide.id],
      drinkId: randomDrink.id,
      creationName: `CYBER ${randomFlavour.name.toUpperCase()} CRUNCH`,
    };

    runAutomationForPreset(randomPreset);
  };

  useEffect(() => {
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    };
  }, []);

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-ffc-red/20 via-ffc-orange/20 to-ffc-gold/20 hover:from-ffc-red/30 hover:to-ffc-gold/30 border border-ffc-gold/40 text-xs font-mono font-bold text-ffc-gold hover:text-white shadow-gold transition-all group"
      >
        <Bot className="w-4 h-4 text-ffc-gold group-hover:rotate-12 transition-transform animate-pulse" />
        <span className="hidden sm:inline">⚡ AI AUTO-CRAFT</span>
        <span className="sm:hidden">⚡ AUTO-BUILD</span>
      </button>

      {/* Real-time Automation HUD Overlay while running */}
      {isRunning && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-xl bg-ffc-black/95 backdrop-blur-2xl border border-ffc-gold/60 rounded-2xl p-4 shadow-[0_0_40px_rgba(255,176,0,0.35)] animate-scaleUp">
          <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ffc-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-ffc-gold" />
              </span>
              <span className="text-xs font-mono font-black text-ffc-gold uppercase tracking-wider">
                🤖 AI FRY MASTER AUTOMATION ACTIVE
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Speed toggle */}
              <button
                type="button"
                onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 2 : 1))}
                className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-ffc-card border border-ffc-cardBorder text-ffc-gold hover:text-white"
              >
                {speedMultiplier}X SPEED
              </button>

              {/* Stop */}
              <button
                type="button"
                onClick={stopAutomation}
                className="p-1 rounded text-ffc-smoke hover:text-white hover:bg-white/10"
                title="Cancel Automation"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-xs font-mono text-white font-bold flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 text-ffc-red animate-bounce-short" />
            <span>{statusMessage}</span>
          </p>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-ffc-card rounded-full overflow-hidden mt-3 border border-white/5">
            <div
              style={{ width: `${(currentAutoStep / 6) * 100}%` }}
              className="h-full bg-gradient-to-r from-ffc-red via-ffc-orange to-ffc-gold transition-all duration-300 rounded-full"
            />
          </div>
        </div>
      )}

      {/* Preset Picker Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="⚡ AI FRY MASTER AUTO-CRAFT"
        subtitle="Watch our algorithm automate all 6 customization steps in real time."
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {CHEF_PRESETS.map((preset) => (
              <div
                key={preset.id}
                onClick={() => runAutomationForPreset(preset)}
                className="p-4 rounded-2xl bg-ffc-card/70 hover:bg-ffc-surface border border-ffc-cardBorder hover:border-ffc-gold transition-all cursor-pointer group space-y-2 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-ffc-red/20 text-ffc-red border border-ffc-red/30 block w-fit mb-1.5">
                    {preset.badge}
                  </span>
                  <h4 className="text-sm font-black font-display text-white group-hover:text-ffc-gold uppercase">
                    {preset.name}
                  </h4>
                  <p className="text-xs text-ffc-cream/70 font-sans mt-1 leading-relaxed">
                    {preset.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-mono text-ffc-gold font-bold">
                  <span>RUN AUTO-BUILD</span>
                  <Play className="w-3.5 h-3.5 fill-current group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* Random AI Build option */}
          <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-left">
              <span className="text-xs font-bold text-white block">WANT A SURPRISE MASTERPIECE?</span>
              <span className="text-[11px] text-ffc-smoke font-mono">
                Let the neural fry algorithm pair cuts, crunch, spices and dips.
              </span>
            </div>

            <button
              type="button"
              onClick={handleRandomAIBuild}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-ffc-gold hover:bg-ffc-goldLight text-ffc-black font-black font-display text-xs uppercase tracking-wider shadow-gold flex items-center justify-center gap-1.5 shrink-0"
            >
              <Zap className="w-4 h-4 fill-current" />
              SURPRISE AI COMBO
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

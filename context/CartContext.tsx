'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product, ChickenCustomization, Deal, MealAddon } from '@/types';
import { calculateCartSummary, CartCalculation } from '@/lib/pricing';
import { DEALS } from '@/data/deals';
import { soundManager } from '@/lib/sound';

interface AppliedCoupon {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrder: number;
}

interface CartContextType {
  items: CartItem[];
  isDrawerOpen: boolean;
  orderType: 'delivery' | 'pickup';
  deliveryPincode: string;
  appliedCoupon: AppliedCoupon | null;
  summary: CartCalculation;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  setOrderType: (type: 'delivery' | 'pickup') => void;
  setDeliveryPincode: (pincode: string) => void;
  addCustomChicken: (customization: ChickenCustomization) => void;
  addProduct: (product: Product, quantity?: number, selectedAddons?: MealAddon[]) => void;
  addDeal: (deal: Deal) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [deliveryPincode, setDeliveryPincode] = useState<string>('560038');
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load from local storage
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem('ffc_cart_items');
      if (savedItems) {
        setItems(JSON.parse(savedItems));
      }
      const savedCoupon = localStorage.getItem('ffc_cart_coupon');
      if (savedCoupon) {
        setAppliedCoupon(JSON.parse(savedCoupon));
      }
      const savedOrderType = localStorage.getItem('ffc_order_type');
      if (savedOrderType === 'delivery' || savedOrderType === 'pickup') {
        setOrderType(savedOrderType);
      }
    } catch {
      // Ignore
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('ffc_cart_items', JSON.stringify(items));
      if (appliedCoupon) {
        localStorage.setItem('ffc_cart_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('ffc_cart_coupon');
      }
      localStorage.setItem('ffc_order_type', orderType);
    } catch {
      // Ignore
    }
  }, [items, appliedCoupon, orderType, isLoaded]);

  const summary = calculateCartSummary(items, appliedCoupon || undefined, orderType);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  const addCustomChicken = (customization: ChickenCustomization) => {
    soundManager.playCrunch();
    const cartItemId = `item-custom-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newItem: CartItem = {
      cartItemId,
      type: 'custom_chicken',
      customization,
      quantity: customization.quantity || 1,
      unitPrice: customization.totalPrice / (customization.quantity || 1),
      totalPrice: customization.totalPrice,
    };

    setItems((prev) => [...prev, newItem]);
    openDrawer();
  };

  const addProduct = (product: Product, quantity = 1, selectedAddons: MealAddon[] = []) => {
    soundManager.playSelect();
    const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    const unitPrice = product.price + addonsTotal;
    const totalPrice = unitPrice * quantity;

    // Check if duplicate standard product exists
    const existingIndex = items.findIndex(
      (item) => item.type === 'menu_product' && item.product?.id === product.id && (!selectedAddons.length)
    );

    if (existingIndex > -1 && selectedAddons.length === 0) {
      setItems((prev) => {
        const updated = [...prev];
        const exist = updated[existingIndex];
        const newQty = exist.quantity + quantity;
        updated[existingIndex] = {
          ...exist,
          quantity: newQty,
          totalPrice: exist.unitPrice * newQty,
        };
        return updated;
      });
    } else {
      const cartItemId = `item-prod-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
      const newItem: CartItem = {
        cartItemId,
        type: 'menu_product',
        product,
        quantity,
        unitPrice,
        totalPrice,
        selectedAddons,
      };
      setItems((prev) => [...prev, newItem]);
    }
    openDrawer();
  };

  const addDeal = (deal: Deal) => {
    soundManager.playSelect();
    const cartItemId = `item-deal-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newItem: CartItem = {
      cartItemId,
      type: 'deal',
      deal,
      quantity: 1,
      unitPrice: deal.price,
      totalPrice: deal.price,
    };
    setItems((prev) => [...prev, newItem]);
    openDrawer();
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeItem(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          return {
            ...item,
            quantity: newQty,
            totalPrice: item.unitPrice * newQty,
          };
        }
        return item;
      })
    );
  };

  const removeItem = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const matchedDeal = DEALS.find((d) => d.code.toUpperCase() === cleanCode);

    if (!matchedDeal) {
      return { success: false, message: 'Invalid coupon code. Try FIREFRIDAY or FIRSTCRUNCH!' };
    }

    const currentSubtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    if (currentSubtotal < matchedDeal.minOrder) {
      return {
        success: false,
        message: `Minimum order of ₹${matchedDeal.minOrder} required for code ${matchedDeal.code}. Add more crispy food!`,
      };
    }

    const coupon: AppliedCoupon = {
      code: matchedDeal.code,
      discountType: matchedDeal.discountType === 'percentage' ? 'percentage' : 'flat',
      discountValue: matchedDeal.discountValue,
      minOrder: matchedDeal.minOrder,
    };

    setAppliedCoupon(coupon);
    soundManager.playAchievementFanfare();
    return { success: true, message: `🔥 Coupon ${matchedDeal.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isDrawerOpen,
        orderType,
        deliveryPincode,
        appliedCoupon,
        summary,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        setOrderType,
        setDeliveryPincode,
        addCustomChicken,
        addProduct,
        addDeal,
        updateQuantity,
        removeItem,
        clearCart,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

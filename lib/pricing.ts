import { ChickenCustomization, CartItem } from '@/types';

export interface PriceBreakdown {
  baseChickenPrice: number;
  crunchPrice: number;
  flavourPrice: number;
  spicePrice: number;
  saucePrice: number;
  sidesPrice: number;
  unitTotal: number;
  quantity: number;
  subtotal: number;
}

export function calculateCustomizationPrice(customization: Partial<ChickenCustomization>): PriceBreakdown {
  const baseChickenPrice = customization.chicken?.basePrice || 0;
  const crunchPrice = customization.crunch?.priceModifier || 0;
  const flavourPrice = customization.flavour?.priceModifier || 0;
  const spicePrice = customization.spice?.priceModifier || 0;
  const saucePrice = customization.sauce?.priceModifier || 0;
  
  let sidesPrice = 0;
  if (customization.sides && customization.sides.length > 0) {
    sidesPrice += customization.sides.reduce((acc, side) => acc + side.price, 0);
  }
  if (customization.drink) {
    sidesPrice += customization.drink.price;
  }
  if (customization.extraDip) {
    sidesPrice += customization.extraDip.price;
  }
  if (customization.dessert) {
    sidesPrice += customization.dessert.price;
  }

  const unitTotal = baseChickenPrice + crunchPrice + flavourPrice + spicePrice + saucePrice + sidesPrice;
  const quantity = customization.quantity || 1;
  const subtotal = unitTotal * quantity;

  return {
    baseChickenPrice,
    crunchPrice,
    flavourPrice,
    spicePrice,
    saucePrice,
    sidesPrice,
    unitTotal,
    quantity,
    subtotal,
  };
}

export interface CartCalculation {
  subtotal: number;
  discount: number;
  discountCode?: string;
  gstTax: number;
  restaurantPackaging: number;
  deliveryFee: number;
  grandTotal: number;
  itemCount: number;
}

export function calculateCartSummary(
  items: CartItem[],
  appliedCoupon?: { code: string; discountType: 'percentage' | 'flat'; discountValue: number; minOrder: number },
  orderType: 'delivery' | 'pickup' = 'delivery'
): CartCalculation {
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  let discount = 0;
  let discountCode: string | undefined = undefined;

  if (appliedCoupon && subtotal >= appliedCoupon.minOrder) {
    discountCode = appliedCoupon.code;
    if (appliedCoupon.discountType === 'percentage') {
      discount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
    } else {
      discount = appliedCoupon.discountValue;
    }
  }

  const taxableAmount = Math.max(0, subtotal - discount);
  const gstTax = Math.round(taxableAmount * 0.05); // 5% GST for restaurant food
  const restaurantPackaging = items.length > 0 ? 25 : 0;
  const deliveryFee = orderType === 'pickup' || subtotal >= 499 || items.length === 0 ? 0 : 49;

  const grandTotal = Math.max(0, taxableAmount + gstTax + restaurantPackaging + deliveryFee);

  return {
    subtotal,
    discount,
    discountCode,
    gstTax,
    restaurantPackaging,
    deliveryFee,
    grandTotal,
    itemCount,
  };
}

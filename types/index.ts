export type SpiceLevel = 1 | 2 | 3 | 4 | 5;

export interface ChickenBaseOption {
  id: string;
  name: string;
  shortDesc: string;
  basePrice: number;
  calories: number;
  piecesCount: string;
  image: string;
  badge?: string;
  visualType: 'strips' | 'wings' | 'popcorn' | 'burger' | 'pieces' | 'tenders';
}

export interface CrunchOption {
  id: string;
  name: string;
  description: string;
  priceModifier: number;
  textureLevel: number; // 1-4
  crispFactor: string;
  icon: string;
}

export interface FlavourOption {
  id: string;
  name: string;
  tagline: string;
  description: string;
  heat: number; // 1-5
  color: string;
  glowColor: string;
  priceModifier: number;
  icon: string;
  spiceDustColor: string;
}

export interface SpiceOption {
  level: SpiceLevel;
  name: string;
  tagline: string;
  warning?: string;
  priceModifier: number;
  flameIntensity: number; // 1-5
}

export interface SauceOption {
  id: string;
  name: string;
  description: string;
  heat: number;
  color: string;
  drizzleColor: string;
  priceModifier: number;
  pairingNote: string;
}

export interface MealAddon {
  id: string;
  category: 'sides' | 'drinks' | 'dips' | 'desserts' | 'extra';
  name: string;
  description: string;
  price: number;
  image: string;
  isPopular?: boolean;
}

export interface ChickenCustomization {
  id: string; // generated creation ID like FFC-CREATE-48291
  creationName: string;
  chicken: ChickenBaseOption;
  crunch: CrunchOption;
  flavour: FlavourOption;
  spice: SpiceOption;
  sauce: SauceOption;
  saucePlacement: 'drizzled' | 'on-the-side' | 'double-dip';
  sides: MealAddon[];
  drink?: MealAddon;
  extraDip?: MealAddon;
  dessert?: MealAddon;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  badges: string[]; // e.g. ["FIRE STARTER", "CRUNCH MASTER"]
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'chicken' | 'burgers' | 'wings' | 'strips' | 'popcorn' | 'buckets' | 'meals' | 'sides' | 'dips' | 'drinks' | 'desserts';
  categoryLabel: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  isCustomizable: boolean;
  isVeg: boolean;
  spiceLevel: number; // 0-5
  calories?: number;
  serves?: string;
  pieces?: string;
  rating: number;
  ratingCount: number;
  badge?: string;
  ingredients?: string[];
  allergens?: string[];
}

export interface Deal {
  id: string;
  title: string;
  tagline: string;
  description: string;
  code: string;
  discountType: 'percentage' | 'flat' | 'free_item';
  discountValue: number;
  minOrder: number;
  price: number;
  originalPrice: number;
  badge: string;
  image: string;
  expiresIn?: string;
  includes: string[];
}

export interface CartItem {
  cartItemId: string;
  type: 'custom_chicken' | 'menu_product' | 'deal';
  product?: Product;
  customization?: ChickenCustomization;
  deal?: Deal;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  selectedAddons?: MealAddon[];
}

export interface StoreLocation {
  id: string;
  name: string;
  area: string;
  city: string;
  pincode: string;
  address: string;
  phone: string;
  hours: string;
  distanceKm?: number;
  rating: number;
  deliveryAvailable: boolean;
  pickupAvailable: boolean;
  latitude: number;
  longitude: number;
  isFlagship?: boolean;
}

export interface CustomerReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  creationName?: string;
  verifiedOrder: boolean;
  likes: number;
  avatar: string;
  badge?: string;
}

export interface OrderTrackingState {
  orderId: string;
  createdAt: string;
  estimatedDeliveryTime: string;
  status: 'received' | 'kitchen_started' | 'frying' | 'packed' | 'out_for_delivery' | 'delivered';
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  grandTotal: number;
  deliveryAddress: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    pincode: string;
    landmark?: string;
  };
  orderType: 'delivery' | 'pickup';
  rider?: {
    name: string;
    phone: string;
    vehicle: string;
    photo: string;
    rating: number;
  };
}

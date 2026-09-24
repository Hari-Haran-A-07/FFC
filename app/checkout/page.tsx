import { Metadata } from 'next';
import { CheckoutFlow } from '@/components/checkout/CheckoutFlow';

export const metadata: Metadata = {
  title: 'Secure Checkout | FFC — Friends Fried Chicken',
  description: 'Complete your crispy chicken order with instant UPI, Cards, or Cash on Delivery.',
};

export default function CheckoutPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-gradient-to-b from-[#120B09] via-ffc-charcoal to-[#0D0908]">
      <CheckoutFlow />
    </div>
  );
}

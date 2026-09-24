import { Metadata } from 'next';
import { DealsSection } from '@/components/deals/DealsSection';

export const metadata: Metadata = {
  title: 'Deals & Offers | FFC — Friends Fried Chicken',
  description:
    'Save on squad meals, Fire Friday feasts, and custom bucket combinations. Exclusive promo codes inside.',
};

export default function DealsPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <DealsSection />
    </div>
  );
}

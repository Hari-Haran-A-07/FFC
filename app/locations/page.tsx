import { Metadata } from 'next';
import { StoreLocator } from '@/components/locations/StoreLocator';

export const metadata: Metadata = {
  title: 'Store Locator & Fry Labs | FFC — Friends Fried Chicken',
  description:
    'Find your nearest FFC Flagship Lab or Hub in Bengaluru, Mumbai, and Delhi NCR for express pickup and late-night delivery.',
};

export default function LocationsPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <StoreLocator />
    </div>
  );
}

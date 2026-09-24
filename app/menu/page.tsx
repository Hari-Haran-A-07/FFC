import { Metadata } from 'next';
import { MenuGrid } from '@/components/menu/MenuGrid';

export const metadata: Metadata = {
  title: 'Menu & Combos | FFC — Friends Fried Chicken',
  description:
    'Browse our signature golden fried chicken, fiery burgers, blistered wings, crunch popcorn, and box meals.',
};

export default function MenuPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <MenuGrid initialCategory="all" showTitle={true} />
    </div>
  );
}

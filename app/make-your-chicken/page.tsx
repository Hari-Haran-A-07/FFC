import { Metadata } from 'next';
import { CustomizerEngine } from '@/components/customizer/CustomizerEngine';

export const metadata: Metadata = {
  title: 'Make Your Chicken Lab | FFC — Friends Fried Chicken',
  description:
    'Customize your chicken in 6 steps: cut, decibel crunch, artisan flavours, spice heat level, and signature dips. We fry it fresh to order.',
};

export default function MakeYourChickenPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-gradient-to-b from-[#140D0B] via-ffc-charcoal to-[#0D0908]">
      <CustomizerEngine />
    </div>
  );
}

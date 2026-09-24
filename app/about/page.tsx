import { Metadata } from 'next';
import { BrandStorySection } from '@/components/story/BrandStorySection';
import { HowItWorksSection } from '@/components/story/HowItWorksSection';
import { FriendsFeastSection } from '@/components/social/FriendsFeastSection';

export const metadata: Metadata = {
  title: 'About Us & Fry Science | FFC — Friends Fried Chicken',
  description:
    'Learn about our 24-hour buttermilk brine, precision temperature frying, and original crunch philosophy.',
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen space-y-12">
      <BrandStorySection />
      <HowItWorksSection />
      <FriendsFeastSection />
    </div>
  );
}

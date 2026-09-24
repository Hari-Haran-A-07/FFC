import { Metadata } from 'next';
import { LiveOrderTracker } from '@/components/tracking/LiveOrderTracker';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `Order #${resolvedParams.id} Live Kitchen Tracker | FFC`,
    description: 'Track your Friends Fried Chicken order live as it is dredged, fried at 175°C, and delivered hot.',
  };
}

export default async function TrackSpecificOrderPage({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <LiveOrderTracker orderId={resolvedParams.id} />
    </div>
  );
}

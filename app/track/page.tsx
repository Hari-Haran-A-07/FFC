'use client';

import React, { useEffect, useState } from 'react';
import { LiveOrderTracker } from '@/components/tracking/LiveOrderTracker';

export default function TrackGenericPage() {
  const [latestOrderId, setLatestOrderId] = useState('FFC-ORD-84920');

  useEffect(() => {
    const saved = localStorage.getItem('ffc_latest_order_id');
    if (saved) {
      setLatestOrderId(saved);
    }
  }, []);

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <LiveOrderTracker orderId={latestOrderId} />
    </div>
  );
}

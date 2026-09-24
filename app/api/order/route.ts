import { NextResponse } from 'next/server';
import { generateOrderId } from '@/lib/utils';
import { calculateCartSummary } from '@/lib/pricing';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, appliedCoupon, orderType, customerDetails, deliveryAddress } = body;

    if (!items || !items.length) {
      return NextResponse.json({ success: false, message: 'Cart items required' }, { status: 400 });
    }

    const summary = calculateCartSummary(items, appliedCoupon, orderType);
    const orderId = generateOrderId();

    const order = {
      orderId,
      createdAt: new Date().toISOString(),
      status: 'received',
      summary,
      items,
      customerDetails,
      deliveryAddress,
      orderType: orderType || 'delivery',
      estimatedDeliveryTime: '25-35 mins',
    };

    return NextResponse.json({
      success: true,
      orderId,
      order,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to process food order' },
      { status: 500 }
    );
  }
}

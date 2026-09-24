import { NextResponse } from 'next/server';
import { calculateCustomizationPrice } from '@/lib/pricing';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const breakdown = calculateCustomizationPrice(body);

    return NextResponse.json({
      valid: true,
      breakdown,
      calculatedPrice: breakdown.subtotal,
    });
  } catch (error) {
    return NextResponse.json(
      { valid: false, error: 'Invalid chicken customization configuration' },
      { status: 400 }
    );
  }
}

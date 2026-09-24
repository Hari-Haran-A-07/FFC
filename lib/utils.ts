import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

export function generateCreationId(): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `FFC-CREATE-${randomNum}`;
}

export function generateOrderId(): string {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `FFC-ORD-${randomNum}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

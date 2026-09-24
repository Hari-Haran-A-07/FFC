import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { CustomizerProvider } from '@/context/CustomizerContext';
import { AudioProvider } from '@/context/AudioContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { CartDrawer } from '@/components/cart/CartDrawer';

export const metadata: Metadata = {
  title: 'FFC | Friends Fried Chicken — Fry It Your Way',
  description:
    'Friends Fried Chicken — bold crispy chicken, custom flavours, 24-hr buttermilk brine, and meals made your way. Build your chicken and order online.',
  keywords: [
    'FFC',
    'Friends Fried Chicken',
    'fried chicken',
    'crispy chicken',
    'make your chicken',
    'custom chicken',
    'wings',
    'chicken burger',
    'food delivery',
  ],
  authors: [{ name: 'FFC FoodTech Labs' }],
  openGraph: {
    title: 'FFC | Friends Fried Chicken — Fry It Your Way',
    description:
      'Bold chicken. Your flavour. Your rules. Customize crunch, spice heat, and glazes in our interactive fry lab.',
    url: 'https://friendsfriedchicken.com',
    siteName: 'Friends Fried Chicken',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'FFC Friends Fried Chicken',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FFC | Friends Fried Chicken — Fry It Your Way',
    description: 'Customize crunch, spice, and sauces in our interactive chicken lab.',
    images: ['https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1200'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'FFC - Friends Fried Chicken',
  image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1200',
  url: 'https://friendsfriedchicken.com',
  telephone: '+91 80 4920 1820',
  servesCuisine: ['Fried Chicken', 'Fast Casual', 'Burgers', 'Wings'],
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '100 Feet Road, Indiranagar',
    addressLocality: 'Bengaluru',
    postalCode: '560038',
    addressCountry: 'IN',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '11:00',
      closes: '03:00',
    },
  ],
  hasMenu: 'https://friendsfriedchicken.com/menu',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-ffc-charcoal text-ffc-cream antialiased flex flex-col justify-between selection:bg-ffc-red selection:text-white">
        <AudioProvider>
          <CartProvider>
            <CustomizerProvider>
              {/* Desktop Interactive Custom Cursor */}
              <CustomCursor />

              {/* Sticky Navbar */}
              <Navbar />

              {/* Slide-out Cart Drawer */}
              <CartDrawer />

              {/* Main Content Area */}
              <main className="flex-1">{children}</main>

              {/* Mega Footer */}
              <Footer />
            </CustomizerProvider>
          </CartProvider>
        </AudioProvider>
      </body>
    </html>
  );
}

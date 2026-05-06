import type { Metadata } from 'next';
import { ShaggaDesktop } from '../page';
import MobileReviews from '@/components/MobileReviews';
import './reviews.css';

export const metadata: Metadata = {
  title: 'Shagga Reviews — Liverpool',
  description: 'Unsolicited opinions on Liverpool, sometimes. by shagga.',
  openGraph: {
    title: 'Shagga Reviews — Liverpool',
    description: 'Unsolicited opinions on Liverpool, sometimes.',
    type: 'website',
    url: 'https://shagga.org/reviews',
  },
  twitter: {
    card: 'summary',
    title: 'Shagga Reviews — Liverpool',
    description: 'Unsolicited opinions on Liverpool, sometimes.',
  },
};

export default function ReviewsRoute() {
  return (
    <>
      {/* Mobile (under 768px): clean native UI, no XP chrome */}
      <div className="reviews-mobile-only">
        <MobileReviews />
      </div>
      {/* Desktop (768px+): full XP desktop with auto-opened reviews app */}
      <div className="reviews-desktop-only">
        <ShaggaDesktop autoOpen="shaggareviews" suppressPopups />
      </div>
    </>
  );
}


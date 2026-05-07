import type { Metadata } from 'next';
import ReviewsRouteClient from './ReviewsRouteClient';

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
  return <ReviewsRouteClient />;
}

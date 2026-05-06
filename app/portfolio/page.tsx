import type { Metadata } from 'next';
import PortfolioWindow from '@/components/PortfolioWindow';
import './portfolio.css';

export const metadata: Metadata = {
  title: 'Sir Monke — Portfolio',
  description:
    'Cyber security and reverse engineering portfolio. C/C++, Python, low-level systems, game security research, web development.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Sir Monke — Portfolio',
    description:
      'Cyber security and reverse engineering portfolio. C/C++, Python, low-level systems.',
    type: 'website',
  },
};

export default function PortfolioPage() {
  return <PortfolioWindow />;
}

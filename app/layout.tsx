import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import RouteTransition from '@/components/RouteTransition';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.darshansuthar.me'),
  title: 'Darshan Suthar — Designer. Founder. Host.',
  description:
    "The story of Darshan Suthar — experience designer, founder of teem.fit and PRODUX, and host of Darshan's Diary.",
  // what a shared link shows (the image comes from app/opengraph-image.tsx)
  openGraph: {
    type: 'website',
    siteName: 'Darshan Suthar',
    title: 'Darshan Suthar',
    description: 'A design leader who ships: craft, teams and strategy',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Darshan Suthar',
    description: 'A design leader who ships: craft, teams and strategy',
  },
  icons: {
    icon: [
      { url: '/images/favicon/favicon.ico', sizes: 'any' },
      { url: '/images/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/images/favicon/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    ],
    apple: [{ url: '/images/favicon/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/images/favicon/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable} data-scroll-behavior="smooth">
      <body>
        <RouteTransition />
        {children}
      </body>
    </html>
  );
}

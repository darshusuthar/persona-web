import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Darshan Suthar — Designer. Founder. Host.',
  description:
    "The story of Darshan Suthar — experience designer, founder of teem.fit and PRODUX, and host of Darshan's Diary.",
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

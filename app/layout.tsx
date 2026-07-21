import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Darshan Suthar — Designer. Founder. Host.',
  description:
    "The story of Darshan Suthar — experience designer, founder of teem.fit and PRODUX, and host of Darshan's Diary.",
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

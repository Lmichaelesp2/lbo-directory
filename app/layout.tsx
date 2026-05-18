import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Local Business Organizations — Texas Business Directory',
  description: 'Browse 588 business organizations across San Antonio, Dallas, Houston, and Austin. Chambers, networking groups, professional associations, and more.',
  openGraph: {
    title: 'Local Business Organizations',
    description: 'Every local business organization in Texas, all in one place.',
    url: 'https://www.localbusinessorganizations.com',
    siteName: 'Local Business Organizations',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}

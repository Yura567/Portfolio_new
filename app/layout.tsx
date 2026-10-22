import type { Metadata, Viewport } from 'next';
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import './globals.css';

const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });
const plex = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-plex', display: 'swap' });
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-plex-mono', display: 'swap' });

export const metadata: Metadata = {
  title: 'Yura Svituha · Full Stack AI Engineer',
  description: 'Full Stack AI Engineer in Fintech and iGaming. Payments at Klarna, budgeting at YNAB, live betting at DraftKings.',
  openGraph: {
    title: 'Yura Svituha · Full Stack AI Engineer',
    description: 'Fintech × iGaming. React, TypeScript, Node.js, Python, AWS.',
    images: ['/yura.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#07070D',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plex.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

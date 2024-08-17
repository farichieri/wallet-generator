import type { Metadata } from 'next';
import { Lato as FontSans } from 'next/font/google';

import Footer from '@/components/Footer';
import Provider from '@/lib/Provider';
import { cn } from '@/lib/utils';

import '@/app/globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['100', '300', '400', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Wallet Generator',
  description: 'Create a new wallet easily',
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Provider>
          <main className="flex min-h-screen flex-col items-center justify-between px-4 py-24">
            {children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}

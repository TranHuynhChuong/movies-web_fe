import type { Metadata } from 'next';
import './globals.css';
import { Roboto } from 'next/font/google';
import { Providers } from '@/contexts/Providers';

const roboto = Roboto({
  weight: [
    '100', // Thin
    '200', // ExtraLight
    '300', // Light
    '400', // Regular
    '500', // Medium
    '600', // SemiBold
    '700', // Bold
    '800', // ExtraBold
    '900', // Black
  ],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Movies Web',
  description: 'Ứng dụng xem phim',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-sans antialiased min-h-screen w-full`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type {Metadata} from 'next';
import {Alegreya} from 'next/font/google';
import './globals.css';
import {cn} from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster"

const alegreya = Alegreya({
  subsets: ['latin'],
  variable: '--font-alegreya',
});

export const metadata: Metadata = {
  title: 'HW Quiz Champion',
  description: 'Kaun Banega Holy Writ High School VIJETA 2025',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased', alegreya.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

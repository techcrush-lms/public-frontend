// import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from 'next';
import './globals.css';
import { Nunito } from 'next/font/google';
import { Provider } from '@/components/ui/provider';
import localFont from 'next/font/local';
import ReduxProvider from '@/redux/redux-provider';
import LoaderWrapper from './(components)/LoaderWrapper';
import { Toaster } from 'react-hot-toast';
import { Suspense } from 'react';
import ProgressBar from '@/components/ProgressBar';

const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' });

export const metadata: Metadata = {
  title: 'TechCrush Scholarship',
  description: '',
  icons: { icon: '/icon.png' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <html lang='en'>
        <body
          // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          className={`${nunito.className} antialiased`}
          style={{ backgroundColor: '#fff', color: '#000' }}
        >
          <Provider>
            <Toaster position='top-center' />
            <Suspense fallback={null}>
              <ProgressBar />
            </Suspense>
            {children}
          </Provider>
        </body>
      </html>
    </ReduxProvider>
  );
}

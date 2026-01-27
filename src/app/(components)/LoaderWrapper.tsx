'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

const LoaderOverlay = dynamic(() => import('./LoaderOverlay'), { ssr: false });

export default function LoaderWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    setLoading(true);
    timeout = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timeout);
  }, [pathname]);
  return (
    <>
      <LoaderOverlay loading={loading} />
      {children}
    </>
  );
}

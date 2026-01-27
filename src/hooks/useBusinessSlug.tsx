'use client';

import { useParams } from 'next/navigation';

export function useBusinessSlug(product?: any) {
  const params = useParams();

  if (params?.business_url) return params.business_url as string;

  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host.endsWith('.doexcess.store')) {
      return host.split('.')[0];
    }
  }

  return product?.business_info?.slug;
}

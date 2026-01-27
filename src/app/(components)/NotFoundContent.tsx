'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function NotFoundInner() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q');

  return <div>Not Found. Query param: {q}</div>;
}

export default function NotFoundContent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundInner />
    </Suspense>
  );
}

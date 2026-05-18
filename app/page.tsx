import { Suspense } from 'react';
import Navigation from '@/components/Navigation';
import DirectoryPage from '@/components/DirectoryPage';

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <Navigation />
      </Suspense>
      <Suspense fallback={<div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8' }}>Loading...</div>}>
        <DirectoryPage />
      </Suspense>
    </>
  );
}

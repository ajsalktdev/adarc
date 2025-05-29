
import { ReactNode, Suspense } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="text-white p-5">Loading...</div>}>
      {children}
    </Suspense>
  );
}

'use client';

import { Providers } from './providers';

export function ClientWrapper({ children }) {
  return (
    <Providers>
      {children}
    </Providers>
  );
}
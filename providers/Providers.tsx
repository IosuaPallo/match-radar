'use client';

import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { EuroThemeProvider } from './ThemeProvider';
import { queryClient } from '@/lib/queryClient';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <EuroThemeProvider>{children}</EuroThemeProvider>
    </QueryClientProvider>
  );
};

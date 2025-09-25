'use client'; // important!

import { AuthProvider } from 'react-auth-kit';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function AuthProviderWrapper({ children }: Props) {
  return (
    <AuthProvider authType="localstorage" authName="_auth">
      {children}
    </AuthProvider>
  );
}

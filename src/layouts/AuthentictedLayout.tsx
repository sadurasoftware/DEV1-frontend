import React from 'react';
import { AuthenticatedLayoutProps } from '../types/LayoutType';

export const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  return (
    <div>
      <header>Authenticated Header</header>
      <main>{children}</main>
      <footer>Authenticated Footer</footer>
    </div>
  );
};

import React from 'react';
import { UnauthenticatedLayoutProps } from '../types/LayoutType';

export const UnauthenticatedLayout: React.FC<UnauthenticatedLayoutProps> = ({ children }) => {
  return (
    <div>
      <header>Unauthenticated Header</header>
      <main>{children}</main>
      <footer>Unauthenticated Footer</footer>
    </div>
  );
};

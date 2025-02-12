import React from 'react'
import { AuthenticatedLayoutProps } from '../types/LayoutType'
export const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
}) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  )
}

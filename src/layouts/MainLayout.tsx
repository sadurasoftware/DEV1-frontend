import React from 'react'
import { UnauthenticatedLayoutProps } from '../types/LayoutType'

export const UnauthenticatedLayout: React.FC<UnauthenticatedLayoutProps> = ({
  children,
}) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  )
}

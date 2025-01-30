import React, { ReactNode } from 'react'
import { Link } from 'react-router'

const StyledLink: React.FC<{ to: string; children: ReactNode }> = ({
  to,
  children,
}) => {
  return (
    <Link
      className="underline text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
      to={to}
    >
      {children}
    </Link>
  )
}

export default StyledLink

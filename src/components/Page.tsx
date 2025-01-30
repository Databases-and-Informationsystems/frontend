import { ReactNode } from 'react'

interface PageProps {
  children: ReactNode
}

const Page = ({ children }: PageProps) => {
  return <div className="container mx-auto p-6 space-y-6">{children}</div>
}

export default Page

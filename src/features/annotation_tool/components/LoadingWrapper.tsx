import React from 'react'
import { useWorkflowContext } from '../context/useWorkflowContext';

interface LoadingWrapperProps {
  children: React.ReactNode;
}

export const LoadingWrapper = ({ children }: LoadingWrapperProps) => {
  const { loading } = useWorkflowContext();
  return (
    <>
      {loading && <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Loading data for the next step</h1>}
      {children}
    </>
  )
}

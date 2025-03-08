import React from 'react'
import { useWorkflowContext } from '../context/useWorkflowContext';
import FadeLoader from 'react-spinners/FadeLoader';

interface LoadingWrapperProps {
  children: React.ReactNode;
}

export const LoadingWrapper = ({ children }: LoadingWrapperProps) => {
  const { loading } = useWorkflowContext();
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 text-center space-y-4">
        <h1 className="text-2xl font-bold">Loading data for the next step...</h1>
        <FadeLoader color="#2563eb" />
      </div>
    );
  }

  return <>{children}</>;
}

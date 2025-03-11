import { useContext } from 'react';
import AuthContext from '@/app/providers/AuthProvider.tsx';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be child of an AuthProvider!');
  }
  return context;
};

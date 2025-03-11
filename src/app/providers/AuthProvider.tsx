import {
  loginUser,
  logoutUser,
  registerUser,
} from '@/features/login/api/login';
import { createContext, useState } from 'react';

interface AuthContextType {
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (username: string, email: string, password: string) => void;
  email?: string;
}

const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  register: () => {},
  email: undefined,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [email, setEmail] = useState<string | undefined>(undefined);

  const login = async (email: string, password: string) => {
    try {
      await loginUser(email, password);
      setEmail(email);
    } catch (error) {
      setEmail(undefined);
      throw new Error('Failed to connect to the server. Error: ' + error);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      throw new Error('Failed to connect to the server. Error: ' + error);
    } finally {
      setEmail(undefined);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      await registerUser(username, email, password);
    } catch (error) {
      throw new Error('Failed to connect to the server. Error: ' + error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        email,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

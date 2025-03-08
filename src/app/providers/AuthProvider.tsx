import {
  loginUser,
  logoutUser,
  registerUser,
} from '@/features/login/api/login';
import { createContext } from 'react';

interface AuthContextType {
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (username: string, email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  register: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const login = async (email: string, password: string) => {
    try {
      await loginUser(email, password);
    } catch (error) {
      throw new Error('Failed to connect to the server. Error: ' + error);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      throw new Error('Failed to connect to the server. Error: ' + error);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

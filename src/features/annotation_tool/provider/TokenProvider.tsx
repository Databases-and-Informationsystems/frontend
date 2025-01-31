import { createContext, useEffect, useState } from "react";
import { Token } from "../types";
import { fetchTokens } from "../api/token";

interface TokenContextType {
  tokens: Token[];
  loading: boolean;
  error: string | null;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

interface TokenProviderProps {
  documentId: number;
  children: React.ReactNode;
}

export const TokenProvider = ({ children, documentId }: TokenProviderProps) => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTokens = async () => {
      try {
        const data = await fetchTokens(documentId);
        setTokens(data);
      } catch (err) {
        setError('Failed to fetch tokens: ' + err);
      }
      finally {
        setLoading(false);
      }
    };
    loadTokens();
  }, [documentId]);

  return (
    <TokenContext.Provider value={{ tokens, loading, error }}>
      {children}
    </TokenContext.Provider>
  );
}

export default TokenContext;
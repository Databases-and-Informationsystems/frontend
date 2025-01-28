import { createContext, useEffect, useState } from "react";
import { Schema } from "../types";
import { fetchSchema } from "../api/schema";

interface SchemaContextType {
  schema: Schema | null;
  loading: boolean;
  error: string | null;
}

const SchemaContext = createContext<SchemaContextType | undefined>(undefined);

interface SchemaProviderProps {
  children: React.ReactNode;
}

export const SchemaProvider = ({ children }: SchemaProviderProps) => {
  const [schema, setSchema] = useState<Schema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSchema = async () => {
      try {
        const data = await fetchSchema();
        setSchema(data);
      } catch (err) {
        setError("Failed to fetch schema: " + err);
      } finally {
        setLoading(false);
      }
    };

    loadSchema();
  }, []);

  return (
    <SchemaContext.Provider value={{ schema, loading, error }}>
      {children}
    </SchemaContext.Provider>
  );
};

export default SchemaContext;
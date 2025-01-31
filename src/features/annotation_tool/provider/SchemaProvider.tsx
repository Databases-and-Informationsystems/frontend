import { createContext, useEffect, useState } from "react";
import { fetchSchema } from "../api/schema";
import { Schema } from "@/types/schema";

interface SchemaContextType {
  schema: Schema | null;
  loading: boolean;
  error: string | null;
}

const SchemaContext = createContext<SchemaContextType | undefined>(undefined);

interface SchemaProviderProps {
  schemaId: number;
  children: React.ReactNode;
}

export const SchemaProvider = ({ children, schemaId }: SchemaProviderProps) => {
  const [schema, setSchema] = useState<Schema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSchema = async () => {
      try {
        console.log(schemaId);
        const data = await fetchSchema(schemaId);
        console.log(data);
        setSchema(data);
      } catch (err) {
        setError("Failed to fetch schema: " + err);
      } finally {
        setLoading(false);
      }
    };

    loadSchema();
  }, [schemaId]);

  return (
    <SchemaContext.Provider value={{ schema, loading, error }}>
      {children}
    </SchemaContext.Provider>
  );
};

export default SchemaContext;
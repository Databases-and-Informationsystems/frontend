import { useContext } from "react";
import SchemaContext from "../provider/SchemaProvider";

export const useSchemaContext = () => {
  const context = useContext(SchemaContext);

  if (!context) {
    throw new Error("useSchema must be used within a SchemaProvider");
  }

  return context;
};
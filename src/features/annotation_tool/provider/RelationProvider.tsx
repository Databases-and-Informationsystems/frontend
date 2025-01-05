import { createContext } from "react";
import { Relation as RelationType } from "../types";
import { useRelation } from "../hooks/useRelation";

interface RelationContextType {
  handleCreateRelation: (relation: RelationType) => void;
  handleDeleteRelation: (relationId: string) => void;
  handleUpdateRelation: (relationId: string, newRelation: RelationType) => void;
  relations: RelationType[];
  loading: boolean;
}

const RelationContext = createContext<RelationContextType | undefined>(undefined);

interface RelationProviderProps {
  children: React.ReactNode;
}

export const RelationProvider = ({ children }: RelationProviderProps) => {
  const {
    relations,
    loading,
    handleCreateRelation,
    handleDeleteRelation,
    handleUpdateRelation
  } = useRelation();

  return (
    <RelationContext.Provider value={{
      relations,
      loading,
      handleCreateRelation,
      handleDeleteRelation,
      handleUpdateRelation,
    }}>
      {children}
    </RelationContext.Provider>
  );
};

export default RelationContext;
import { createContext } from "react";
import { CreateRelationPayload, Relation as RelationType } from "../types";
import { useRelation } from "../hooks/useRelation";

interface RelationContextType {
  handleCreateRelation: (payload: CreateRelationPayload) => void;
  handleDeleteRelation: (relationId: number) => void;
  handleUpdateRelation: (relationId: number, newRelation: RelationType) => void;
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
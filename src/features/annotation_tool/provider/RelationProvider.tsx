import { createContext } from "react";
import { Relation as RelationType } from "../types";
import { useRelation } from "../hooks/useRelation";

interface RelationContextType {
    createRelation: (relation: RelationType) => void;
    deleteRelation: (relationId: number) => void;
    updateRelation: (relationId: number, newRelation: RelationType) => void;
    relations: RelationType[];
    loading: boolean;
}

const RelationContext = createContext<RelationContextType | undefined>(undefined);

interface RelationProviderProps {
    children: React.ReactNode;
}

export const RelationProvider = ({ children }: RelationProviderProps) => {
    const relationContext = useRelation();

    return (
        <RelationContext.Provider value={relationContext}>
            {children}
        </RelationContext.Provider>
    );
};

export default RelationContext;
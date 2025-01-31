import { createContext, useEffect, useRef, useState } from "react";
import { CreateRelationPayload, Relation, Relation as RelationType, UpdateRelationPayload } from "../types";
import { useStepNavigation } from "../hooks/useStepNavigation";
import { createRelation, deleteRelation, updateRelation, acceptRelationSuggestion, rejectRelationSuggestion } from "../api/relation";

interface RelationContextType {
  handleCreateRelation: (payload: CreateRelationPayload) => void;
  handleDeleteRelation: (relationId: number) => void;
  handleUpdateRelation: (relationId: number, payload: UpdateRelationPayload) => void;
  handleAcceptRelation: (relationId: number) => void;
  handleRejectRelation: (relationId: number) => void;
  relations: RelationType[];
  loading: boolean;
}

const RelationContext = createContext<RelationContextType | undefined>(undefined);

interface RelationProviderProps {
  children: React.ReactNode;
}

export const RelationProvider = ({ children }: RelationProviderProps) => {
  const [relations, setRelations] = useState<Relation[]>([])
  const { step } = useStepNavigation()
  const [loading, setLoading] = useState(true)
  const relationsFetched = useRef<boolean>(false)

  useEffect(() => {
    const loadRelations = async () => {
      setLoading(true)
      try {
        const data = await fetchRelations()
        setRelations(data)
        relationsFetched.current = true
        console.log('Relations', data)
      } catch (error) {
        console.error('Failed to fetch relations:', error)
      } finally {
        setLoading(false)
      }
    }
    if (step === 'relationSuggestion' && !relationsFetched.current) {
      loadRelations()
    }
  }, [step])

  const handleCreateRelation = async (payload: CreateRelationPayload) => {
    try {
      const createdRelation = await createRelation(payload)
      setRelations((prev) => [...prev, createdRelation])
    } catch (error) {
      console.error('Failed to create relation:', error)
    }
  }

  const handleDeleteRelation = async (relationId: number) => {
    try {
      await deleteRelation(relationId)
      setRelations((prev) =>
        prev.filter((relation) => relation.id !== relationId)
      )
    } catch (error) {
      console.error('Failed to delete relation:', error)
    }
  }

  const handleUpdateRelation = async (
    relationId: number,
    payload: UpdateRelationPayload
  ) => {
    try {
      const updatedRelation = await updateRelation(relationId, payload)
      setRelations((prev) =>
        prev.map((relation) =>
          relation.id === relationId ? updatedRelation : relation
        )
      )
    } catch (error) {
      console.error('Failed to update relation:', error)
    }
  }

  const handleAcceptRelation = async (relationId: number) => {
    try {
      const acceptedRelation = await acceptRelationSuggestion(relationId)
      setRelations((prev) => {
        const relationsWithoutSuggestion = prev.filter(
          (suggestion) => suggestion.id !== relationId
        )
        return [...relationsWithoutSuggestion, acceptedRelation]
      })
    } catch (error) {
      console.error('Failed to accept relation:', error)
    }
  }

  const handleRejectRelation = async (relationId: number) => {
    try {
      await rejectRelationSuggestion(relationId)
      setRelations((prev) => prev.filter((relation) => relation.id !== relationId))
    } catch (error) {
      console.error('Failed to reject relation:', error)
    }
  }

  return (
    <RelationContext.Provider value={{
      relations,
      loading,
      handleCreateRelation,
      handleDeleteRelation,
      handleUpdateRelation,
      handleAcceptRelation,
      handleRejectRelation,
    }}>
      {children}
    </RelationContext.Provider>
  );
};

export default RelationContext;
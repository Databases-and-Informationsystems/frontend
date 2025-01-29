import { useEffect, useRef, useState } from 'react'
import { CreateRelationPayload, Relation, UpdateRelationPayload } from '../types'
import { useSelection } from './useSelection'
import { createRelation, deleteRelation, fetchRelations, updateRelation } from '../api/relation'

export const useRelation = () => {
  const [relations, setRelations] = useState<Relation[]>([])
  const { currentStep } = useSelection()
  const [loading, setLoading] = useState(true)
  const relationsFetched = useRef<boolean>(false)

  useEffect(() => {
    const loadRelations = async () => {
      setLoading(true);
      try {
        const data = await fetchRelations();
        setRelations(data);
        relationsFetched.current = true;
        console.log('Relations', data);
      } catch (error) {
        console.error('Failed to fetch relations:', error);
      } finally {
        setLoading(false);
      }
    };
    if (currentStep === 3 && !relationsFetched.current) {
      loadRelations();
    }
  }, [currentStep]);

  const handleCreateRelation = async (payload: CreateRelationPayload) => {
    try {
      const createdRelation = await createRelation(payload);
      setRelations((prev) => [...prev, createdRelation]);
    } catch (error) {
      console.error('Failed to create relation:', error);
    }
  };

  const handleDeleteRelation = async (relationId: number) => {
    try {
      await deleteRelation(relationId);
      setRelations((prev) => prev.filter((relation) => relation.id !== relationId));
    } catch (error) {
      console.error('Failed to delete relation:', error);
    }
  };

  const handleUpdateRelation = async (relationId: number, payload: UpdateRelationPayload) => {
    try {
      const updated = await updateRelation(relationId, payload);
      setRelations((prev) =>
        prev.map((relation) => (relation.id === relationId ? updated : relation))
      );
    } catch (error) {
      console.error('Failed to update relation:', error);
    }
  };

  return {
    relations,
    loading,
    handleCreateRelation,
    handleDeleteRelation,
    handleUpdateRelation,
  }
}

import { useEffect, useRef, useState } from 'react'
import { Relation as RelationType } from '../types'
import { useSelection } from './useSelection'
import { MOCK_RELATIONS } from '@/testing/mocks/documentMocks'

export const useRelation = () => {
  const [relations, setRelations] = useState<RelationType[]>([])
  const { currentStep } = useSelection()
  const [loading, setLoading] = useState(false)

  const relationsFetched = useRef<boolean>(false)

  useEffect(() => {
    if (currentStep === 4 && !relationsFetched.current) {
      fetchRelations();
    }
  }, [currentStep]);

  useEffect(() => {
    console.log('Current Relations:', relations);
  }, [relations]);


  const fetchRelations = async () => {
    setLoading(true);
    try {
      setRelations(MOCK_RELATIONS);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const createRelation = (relation: RelationType) => {
    setRelations([...relations, relation])
  }

  const deleteRelation = (relationId: number) => {
    setRelations((prev) =>
      prev.filter((relation) => relation.id !== relationId)
    )
  }

  const updateRelation = (relationId: number, newRelation: RelationType) => {
    setRelations(
      relations.map((relation) =>
        relation.id === relationId ? newRelation : relation
      )
    )
  }

  return {
    relations,
    loading,
    createRelation,
    deleteRelation,
    updateRelation,
  }
}

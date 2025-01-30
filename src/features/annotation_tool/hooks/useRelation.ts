import { useEffect, useRef, useState } from 'react'
import {
  CreateRelationPayload,
  Relation,
  UpdateRelationPayload,
} from '../types'
import {
  acceptRelationSuggestion,
  createRelation,
  deleteRelation,
  fetchRelations,
  rejectRelationSuggestion,
  updateRelation,
} from '../api/relation'
import { useStepNavigation } from './useStepNavigation'

export const useRelation = () => {
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

  return {
    relations,
    loading,
    handleCreateRelation,
    handleDeleteRelation,
    handleUpdateRelation,
    handleAcceptRelation,
    handleRejectRelation,
  }
}

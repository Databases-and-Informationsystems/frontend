import { useState } from 'react'
import { CreateMentionPayload, Mention, UpdateMentionPayload } from '../types'
import {
  acceptMentionSuggestion,
  createMention,
  deleteMention,
  rejectMentionSuggestion,
  updateMention,
} from '../api/mention'

export const useMentions = () => {
  const [mentions, setMentions] = useState<Mention[]>([])
  const [loading, setLoading] = useState(true)

  const handleCreateMention = async (payload: CreateMentionPayload) => {
    try {
      const createdMention = await createMention(payload)
      setMentions((prev) => [...prev, createdMention])
    } catch (err) {
      console.error('Failed to create mention:', err)
    }
  }

  const handleUpdateMention = async (
    mentionId: number,
    payload: UpdateMentionPayload
  ) => {
    try {
      const updatedMention = await updateMention(mentionId, payload)
      setMentions((prev) =>
        prev.map((mention) =>
          mention.id === updatedMention.id ? updatedMention : mention
        )
      )
    } catch (err) {
      console.error('Failed to update mention:', err)
    }
  }

  const handleDeleteMention = async (mentionId: number) => {
    try {
      await deleteMention(mentionId)
      setMentions((prev) => prev.filter((mention) => mention.id !== mentionId))
    } catch (err) {
      console.error('Failed to delete mention:', err)
    }
  }

  const handleAcceptMention = async (mentionId: number) => {
    try {
      const acceptedMention = await acceptMentionSuggestion(mentionId)
      // This should be fine, but can mix up the keys
      // Reminder to myself, if there are performance issues: Create suggestions and mentions state
      setMentions((prev) => {
        const mentionsWithoutSuggestion = prev.filter(
          (suggestion) => suggestion.id !== mentionId
        )
        return [...mentionsWithoutSuggestion, acceptedMention]
      })
    } catch (err) {
      console.error('Failed to accept mention:', err)
    }
  }

  const handleRejectMention = async (mentionId: number) => {
    try {
      await rejectMentionSuggestion(mentionId)
      setMentions((prev) => prev.filter((mention) => mention.id !== mentionId))
    } catch (err) {
      console.error('Failed to reject mention:', err)
    }
  }

  return {
    mentions,
    setMentions,
    loading,
    setLoading,
    handleCreateMention,
    handleUpdateMention,
    handleDeleteMention,
    handleAcceptMention,
    handleRejectMention,
  }
}

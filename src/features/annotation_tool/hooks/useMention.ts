import { useState } from 'react'
import { CreateMentionPayload, Mention, UpdateMentionPayload } from '../types'
import { createMention, deleteMention, updateMention } from '../api/mention'

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

  const handleDeleteMention = async (mention: Mention) => {
    try {
      await deleteMention(mention.id)
      setMentions((prev) => prev.filter((mention) => mention.id !== mention.id))
    } catch (err) {
      console.error('Failed to delete mention:', err)
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
  }
}

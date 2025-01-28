import { useState } from 'react'
import { CreateMentionPayload, Mention } from '../types'
import { createMention, deleteMention, updateMention } from '../api/mention'

export const useMentions = () => {
  const [mentions, setMentions] = useState<Mention[]>([])
  const [loading, setLoading] = useState(true)

  const handleCreateMention = async (newMention: Mention) => {
    try {
      const payload: CreateMentionPayload = {
        schmea_mention_id: newMention.schema_mention.id,
        document_edit_id: newMention.document_edit_id,
        token_ids: newMention.tokens.map((token) => token.id),
      }

      const createdMention = await createMention(payload)
      setMentions((prev) => [...prev, createdMention])
    } catch (err) {
      console.error('Failed to create mention:', err)
    }
  }

  const handleUpdateMention = async (
    mentionId: string,
    updatedMention: Mention
  ) => {
    try {
      const updatedMention = await updateMention(mentionId, updatedMention)
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

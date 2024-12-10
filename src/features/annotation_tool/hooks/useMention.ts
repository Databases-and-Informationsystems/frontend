import { useEffect, useState } from 'react'
import { Mention as MentionType } from '../types'

export const useMentions = (initialMentions: MentionType[]) => {
  const [mentions, setMentions] = useState<MentionType[]>(initialMentions)
  //const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log('Current Mentions:', mentions);
  }, [mentions]);

  const createMention = (mention: MentionType) => {
    setMentions([...mentions, mention])
  }

  const deleteMention = (mentionId: number) => {
    setMentions((prev) => prev.filter((mention) => mention.id !== mentionId))
  }

  const updateMention = (mentionId: number, newMention: MentionType) => {
    setMentions(
      mentions.map((mention) =>
        mention.id === mentionId ? newMention : mention
      )
    )
  }

  return {
    mentions,
    createMention,
    deleteMention,
    updateMention,
  }
}

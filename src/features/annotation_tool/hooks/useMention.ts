import { useEffect, useState } from 'react'
import { Mention } from '../types'
import { createMention, deleteMention, updateMention } from '../api/mention';

export const useMentions = () => {
  const [mentions, setMentions] = useState<Mention[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Current Mentions:', mentions);
  }, [mentions]);

  const handleCreateMention = async (newMention: Mention) => {
    const createdMention = await createMention(newMention);
    setMentions((prev) => [...prev, createdMention]);
  };

  const handleUpdateMention = async (mentionId: string, updatedMention: Mention) => {
    const updated = await updateMention(mentionId, updatedMention);
    setMentions((prev) => prev.map((mention) => (mention.id === mentionId ? updated : mention)));
  };

  const handleDeleteMention = async (mentionId: string) => {
    await deleteMention(mentionId);
    setMentions((prev) => prev.filter((mention) => mention.id !== mentionId));
  };


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

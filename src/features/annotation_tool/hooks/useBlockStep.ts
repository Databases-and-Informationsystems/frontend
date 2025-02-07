import { useMemo } from 'react'
import { useMentionContext } from '../context/useMentionContext';
import { useRelationContext } from '../context/useRelationContext';

export const useBlockStep = (step: string) => {
  const { mentions } = useMentionContext();
  const { relations } = useRelationContext();

  const isBlocked = useMemo(() => {
    if (step === 'MENTION_SUGGESTION') {
      return mentions.some((mention) => mention.isShownRecommendation === true);
    }

    if (step === 'RELATION_SUGGESTION') {
      return relations.some(relation => relation.isShownRecommendation === true);
    }

    return false;
  }, [mentions, relations, step]);
  return isBlocked;
}

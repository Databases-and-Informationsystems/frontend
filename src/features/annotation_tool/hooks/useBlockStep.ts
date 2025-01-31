import { useMemo } from 'react'
import { useMentionContext } from '../context/useMentionContext';
import { useRelationContext } from '../context/useRelationContext';

export const useBlockStep = (step: string) => {
  const { mentions } = useMentionContext();
  const { relations } = useRelationContext();

  const isBlocked = useMemo(() => {
    if (step === 'mentionSuggestion') {
      return mentions.some((mention) => mention.isShownRecommendation === true);
    }

    if (step === 'relationSuggestion') {
      return relations.some(relation => relation.isShownRecommendation === true);
    }

    return false;
  }, [mentions, relations, step]);
  return isBlocked;
}

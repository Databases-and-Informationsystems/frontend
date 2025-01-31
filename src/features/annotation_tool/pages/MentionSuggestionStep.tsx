import { useEffect } from 'react';
import { AnnotatedText } from '../components/AnnotatedText';
import { useMentionContext } from '../context/useMentionContext';
import { useTokens } from '../context/useTokens';
import { useStepNavigation } from '../hooks/useStepNavigation';
import { useSchema } from '../context/useSchema';

export const MentionSuggestionStep = () => {
  const { tokens, loading: tokenLoading, error } = useTokens();
  const { loading: schemaLoading } = useSchema();
  const { mentions, loading } = useMentionContext();
  const { step, handleStepChange } = useStepNavigation();

  const hasSuggestions = mentions.some(mention => mention.isShownRecommendation === true);

  useEffect(() => {
    if (!loading && !hasSuggestions && step === 'mentionSuggestion') {
      handleStepChange('mentionEditing');
    }
  }, [handleStepChange, hasSuggestions, loading, step]);

  if (loading) {
    return <p>Loading suggestions...</p>;
  }

  if (schemaLoading) {
    return <p>Loading schema...</p>;
  }

  if (tokenLoading) {
    return <p>Loading tokens...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!hasSuggestions) {
    return <p>No suggestions available. This step is complete.</p>;
  }

  return (
    <>
      <AnnotatedText tokens={tokens} showDeleteButton={false} />
    </>
  )
}

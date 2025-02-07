import { useEffect } from 'react';
import { AnnotatedText } from '../components/AnnotatedText';
import { useMentionContext } from '../context/useMentionContext';
import { useTokensContext } from '../context/useTokensContext';
import { useStepNavigation } from '../hooks/useStepNavigation';
import { useSchemaContext } from '../context/useSchemaContext';

export const MentionSuggestionStep = () => {
  const { tokens, loading: tokenLoading, error } = useTokensContext();
  const { loading: schemaLoading } = useSchemaContext();
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

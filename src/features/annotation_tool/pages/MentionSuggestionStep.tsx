import { useEffect } from 'react';
import { AnnotatedText } from '../components/AnnotatedText';
import { useMentionContext } from '../context/useMentionContext';
import { useTokens } from '../hooks/useTokens';
import { useStepNavigation } from '../hooks/useStepNavigation';

export const MentionSuggestionStep = () => {
  const { tokens } = useTokens();
  const { mentions, loading } = useMentionContext();
  const { step, handleStepChange } = useStepNavigation();

  const hasSuggestions = mentions.some(mention => mention.isShownRecommendation === true);

  useEffect(() => {
    if(!loading && !hasSuggestions && step === 'mentionSuggestion') {
      handleStepChange('mentionEditing');
    }
  }, [handleStepChange, hasSuggestions, loading, step]);

  if (loading) {
    return <p>Loading suggestions...</p>; // Ladeanzeige
  }

  if (!hasSuggestions) {
    return <p>No suggestions available. This step is complete.</p>;
  }

  return (
    <>
      <AnnotatedText tokens={tokens} showDeleteButton={false}/>
    </>
  )
}

import { useEffect } from 'react';
import { AnnotatedText } from '../components/AnnotatedText';
import { useMentionContext } from '../context/useMentionContext';
import { useSelection } from '../hooks/useSelection';
import { useTokens } from '../hooks/useTokens';

export const MentionSuggestionStep = () => {
  const { tokens } = useTokens();
  const { mentions, loading } = useMentionContext();
  const { currentStep, setCurrentStep } = useSelection();

  const hasSuggestions = mentions.some(mention => mention.isShownRecommendation === true);

  useEffect(() => {
    if(!loading && !hasSuggestions) {
      setCurrentStep(currentStep + 1);
    }
  }, [hasSuggestions, setCurrentStep, currentStep, loading]);

  if (loading) {
    return <p>Loading suggestions...</p>; // Ladeanzeige
  }

  if (!hasSuggestions) {
    return <p>No suggestions available. This step is complete.</p>;
  }

  return (
    <>
      <div>First Step</div>
      <AnnotatedText tokens={tokens} />
    </>
  )
}

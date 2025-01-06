import { useEffect } from 'react';
import { AnnotatedText } from '../components/AnnotatedText';
import { useMentionContext } from '../context/useMentionContext';
import { useSelection } from '../hooks/useSelection';
import { useTokens } from '../hooks/useTokens';

export const MentionSuggestionStep = () => {
  const { tokens } = useTokens();
  const { mentions, loading } = useMentionContext();
  const { currentStep, setCurrentStep } = useSelection();


  console.log('Current Mentions in first step:', mentions);
  const hasSuggestions = mentions.some(mention => mention.isShownRecommendation === true);
  console.log(loading, hasSuggestions);

  useEffect(() => {
    if(!loading && !hasSuggestions) {
      setCurrentStep(currentStep + 1);
    }
  }, [hasSuggestions, setCurrentStep, currentStep, loading]);

  if (loading) {
    return <p>Loading suggestions...</p>; // Ladeanzeige
  }

  return (
    <>
      <div>First Step</div>
      <AnnotatedText tokens={tokens} />
    </>
  )
}

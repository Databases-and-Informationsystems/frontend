import { AnnotatedText } from '../components/AnnotatedText';
import { useMentionContext } from '../context/useMentionContext';

export const MentionSuggestionStep = () => {
  const { mentions } = useMentionContext();

  const hasSuggestions = mentions.some(mention => mention.isShownRecommendation === true);

  if (!hasSuggestions) {
    return <p>No suggestions available. This step is complete.</p>;
  }

  return (
    <>
      <AnnotatedText showDeleteButton={false} />
    </>
  )
}

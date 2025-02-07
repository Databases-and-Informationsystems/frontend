import { useEffect } from "react";
import { useRelationContext } from "../context/useRelationContext"
import { RelationSuggestionContainer } from "../components/RelationSuggestionContainer";
import { useStepNavigation } from "../hooks/useStepNavigation";

export const RelationSuggestionStep = () => {
  const { relations, loading } = useRelationContext();
  const { step, handleStepChange } = useStepNavigation();

  const hasSuggestions = relations.some(relation => relation.isShownRecommendation === true);

  useEffect(() => {
    if (!loading && !hasSuggestions && step === 'relationSuggestion') {
      handleStepChange('relationEditing');
    }
  }, [hasSuggestions, loading, step, handleStepChange]);

  if (loading || !hasSuggestions) {
    return <p>Loading suggestions or no suggestions available...</p>;
  }

  return (
    <RelationSuggestionContainer/>
  )
}

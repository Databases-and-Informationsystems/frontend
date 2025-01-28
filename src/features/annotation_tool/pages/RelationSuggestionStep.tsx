import { useEffect } from "react";
import { useRelationContext } from "../context/useRelationContext"
import { useSelection } from "../hooks/useSelection";
import { RelationSuggestionContainer } from "../components/RelationSuggestionContainer";

export const RelationSuggestionStep = () => {
  const { relations, loading } = useRelationContext();
  const { currentStep, setCurrentStep } = useSelection();

  const hasSuggestions = relations.some(relation => relation.isShownRecommendation === true);

  console.log(hasSuggestions);
  console.log(loading);

  useEffect(() => {
    if (!loading && !hasSuggestions) {
      setCurrentStep(currentStep + 1);
    }
  }, [hasSuggestions, setCurrentStep, currentStep, loading]);

  if (loading || !hasSuggestions) {
    return <p>Loading suggestions or no suggestions available...</p>;
  }

  return (
    <RelationSuggestionContainer/>
  )
}

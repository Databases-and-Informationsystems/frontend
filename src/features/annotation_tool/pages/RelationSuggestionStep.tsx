import { useRelationContext } from "../context/useRelationContext"
import { RelationSuggestionContainer } from "../components/RelationSuggestionContainer";

export const RelationSuggestionStep = () => {
  const { relations, loading } = useRelationContext();

  const hasSuggestions = relations.some(relation => relation.isShownRecommendation === true);

  if (loading) {
    return <p>Loading suggestions...</p>;
  }

  if(!hasSuggestions) {
    return <p>No suggestions available. This step is complete.</p>;
  }

  return (
    <RelationSuggestionContainer/>
  )
}

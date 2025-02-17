import { useRelationContext } from "../context/useRelationContext"
import { RelationSuggestionContainer } from "../components/RelationSuggestionContainer";
import { useEffect } from "react";
import { workflowOrder, WorkflowStep } from "../types/workflow";
import { useWorkflowContext } from "../context/useWorkflowContext";
import { TriangleAlert } from "lucide-react";
import { toast } from "sonner";

export const RelationSuggestionStep = () => {
  const { relations, loading } = useRelationContext();
  const { maxStep, updateStep, updateMaxStep } = useWorkflowContext();

  const hasSuggestions = relations.some(relation => relation.isShownRecommendation === true);

  const nextStep: WorkflowStep = 'RELATIONS';

  useEffect(() => {
    if (!hasSuggestions && !loading) {
      const isForward = isForwardStep(nextStep, maxStep);
      if (isForward) {
        updateMaxStep(nextStep).then(success => {
          if (!success) {
            toast.warning('Failed to update step.', {
              className: 'text-base',
              icon: <TriangleAlert />,
            });
            return;
          }
          updateStep(nextStep);
        });
      } else {
        updateStep(nextStep);
      }
    }
  }, [loading, hasSuggestions, maxStep, nextStep, updateMaxStep, updateStep]);

  if (loading) {
    return <p>Loading suggestions...</p>;
  }

  return (
    <RelationSuggestionContainer />
  )
}

function isForwardStep(targetStep: WorkflowStep, currentMax: WorkflowStep): boolean {
  const currentIndex = workflowOrder.indexOf(currentMax);
  const targetIndex = workflowOrder.indexOf(targetStep);
  return targetIndex > currentIndex;
}

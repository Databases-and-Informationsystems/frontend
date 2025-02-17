import { useEffect } from 'react';
import { AnnotatedText } from '../components/AnnotatedText';
import { useMentionContext } from '../context/useMentionContext';
import { workflowOrder, WorkflowStep } from '../types/workflow';
import { toast } from 'sonner';
import { useWorkflowContext } from '../context/useWorkflowContext';
import { TriangleAlert } from 'lucide-react';

export const MentionSuggestionStep = () => {
  const { mentions } = useMentionContext();
  const { maxStep, updateStep, updateMaxStep } = useWorkflowContext();


  const hasSuggestions = mentions.some(mention => mention.isShownRecommendation === true);

  const nextStep: WorkflowStep = 'MENTIONS';

  useEffect(() => {
    if (!hasSuggestions) {
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
  }, [hasSuggestions, maxStep, nextStep, updateMaxStep, updateStep]);

  return (
    <>
      <AnnotatedText showDeleteButton={false} />
    </>
  )
}

function isForwardStep(targetStep: WorkflowStep, currentMax: WorkflowStep): boolean {
  const currentIndex = workflowOrder.indexOf(currentMax);
  const targetIndex = workflowOrder.indexOf(targetStep);
  return targetIndex > currentIndex;
}
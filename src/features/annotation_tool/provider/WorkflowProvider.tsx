import { createContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { updateWorkflowStep } from "../api/workflow";
import { workflowOrder, WorkflowStep } from "../types/workflow";

interface WorkflowContextType {
  currentStep: WorkflowStep;
  maxStep: WorkflowStep;
  error: string | null;
  updateMaxStep: (step: WorkflowStep) => void;
  updateStep: (step: WorkflowStep) => void;
}

interface WorkflowProviderProps {
  children: React.ReactNode;
  initialStep: WorkflowStep;
}

function isForwardStep(newStep: WorkflowStep, currentMax: WorkflowStep): boolean {
  return workflowOrder.indexOf(newStep) > workflowOrder.indexOf(currentMax);
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider = ({ children, initialStep }: WorkflowProviderProps) => {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>(initialStep);
  const [maxStep, setMaxStep] = useState<WorkflowStep>(initialStep);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const step = searchParams.get('step') as WorkflowStep | null;
    if (step && workflowOrder.includes(step)) {
      setCurrentStep(step);
      setMaxStep(prev => isForwardStep(step, prev) ? step : prev);
    }
  }, [searchParams]);

  const updateStep = (step: WorkflowStep) => {
    setCurrentStep(step);
    setSearchParams({ step });
  }

  const updateMaxStep = async (step: WorkflowStep) => {
    try {
      const workflowData = await updateWorkflowStep(Number(id), step);
      setMaxStep(workflowData.state.type as WorkflowStep);
      setError(null);
    }
    catch (err) {
      setError('Failed to update workflow step: ' + err);
    }
  }

  return (
    <WorkflowContext.Provider value={{ currentStep, maxStep, error, updateStep, updateMaxStep }}>
      {children}
    </WorkflowContext.Provider>
  );
}

export default WorkflowContext;
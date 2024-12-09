import { useSearchParams } from "react-router";

export const useStepNavigation = (defaultStep = 'mentionEdit') => {
    const [searchParams, setSearchParams] = useSearchParams();

    const step = searchParams.get('step') || defaultStep;

    const handleStepChange = (newStep: string) => {
        setSearchParams({ step: newStep });
    }

    return { step, handleStepChange };
}
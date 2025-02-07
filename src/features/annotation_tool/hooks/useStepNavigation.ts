import { useSearchParams } from "react-router";

export const useStepNavigation = (initialStep: string = 'MENTION_SUGGESTION') => {
    const [searchParams, setSearchParams] = useSearchParams();

    const step = searchParams.get('step') || initialStep;

    const handleStepChange = (newStep: string) => {
        setSearchParams({ step: newStep });
    }

    return { step, handleStepChange };
}
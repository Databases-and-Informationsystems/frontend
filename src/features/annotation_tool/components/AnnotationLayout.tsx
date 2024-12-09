import React from 'react'
import { useStepNavigation } from '../hooks/useStepNavigation';
import { MOCK_MENTIONS, MOCK_TOKENS } from '@/testing/mocks/documentMocks';
import { AnnotatedText } from './AnnotatedText';

export const AnnotationLayout = () => {
  //const { currentStep, handleStepChange } = useStepNavigation();
  const [document] = React.useState({ 
    tokens: MOCK_TOKENS,
    mentions: MOCK_MENTIONS
  });

  return (
    <div>
      {/* Add Navigation here*/}
      <AnnotatedText tokens={document.tokens} mentions={document.mentions} />
    </div>
  )
}

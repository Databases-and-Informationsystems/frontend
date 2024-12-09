import React from 'react'
import { useStepNavigation } from '../hooks/useStepNavigation';
import { MOCK_MENTIONS, MOCK_TOKENS } from '@/testing/mocks/documentMocks';
import { AnnotatedText } from './AnnotatedText';
import { ModeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { SelectionProvider } from '../provider/SelectionProvider';

export const AnnotationLayout = () => {
  //const { currentStep, handleStepChange } = useStepNavigation();
  const [document] = React.useState({ 
    tokens: MOCK_TOKENS,
    mentions: MOCK_MENTIONS
  });

  return (
  <SelectionProvider tokens={document.tokens}>
    <div className='p-6'>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      Annotation Document
      </h1>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      I will be the navbar
    </h2>
      {/* Add Navigation here*/}
      <AnnotatedText tokens={document.tokens} mentions={document.mentions} />
      <ModeToggle />
    </div>
  </SelectionProvider>
  )
}

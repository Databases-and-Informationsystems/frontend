import React from 'react'
//import { useStepNavigation } from '../hooks/useStepNavigation';
import { MOCK_MENTIONS, MOCK_TOKENS } from '@/testing/mocks/documentMocks';
import { ModeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { SelectionProvider } from '../provider/SelectionProvider';
import { MentionProvider } from '../provider/MentionProvider';
import { AnnotationControlBox } from './AnnotationControlBox';
import { RelationProvider } from '../provider/RelationProvider';
import { useSelection } from '../hooks/useSelection';
import { MentionStep } from '../pages/MentionStep';
import { RelationStep } from '../pages/RelationStep';

export const AnnotationLayout = () => {
  //const { currentStep, handleStepChange } = useStepNavigation();
  const [document] = React.useState({
    tokens: MOCK_TOKENS,
    mentions: MOCK_MENTIONS
  });

  return (
    <SelectionProvider initialTokens={document.tokens}>
      <MentionProvider initialMentions={document.mentions}>
        <RelationProvider>
          <div className='p-6'>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Annotation Document
            </h1>
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              I will be the navbar
            </h2>
            {/* Add Navigation here*/}
            <AnnotationControlBox />
            <CurrentStepRender />
            <ModeToggle />
          </div>
        </RelationProvider>
      </MentionProvider>
    </SelectionProvider>
  )
}

const CurrentStepRender = () => {
  const { currentStep } = useSelection();

  switch (currentStep) {
    case 2:
      return <MentionStep/>
    case 3:
      return <RelationStep/>
  }
}

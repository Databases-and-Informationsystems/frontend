//import { useStepNavigation } from '../hooks/useStepNavigation';
import { ModeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { SelectionProvider } from '../provider/SelectionProvider';
import { MentionProvider } from '../provider/MentionProvider';
import { AnnotationControlBox } from './AnnotationControlBox';
import { RelationProvider } from '../provider/RelationProvider';
import { useSelection } from '../hooks/useSelection';
import { MentionStep } from '../pages/MentionStep';
import { RelationStep } from '../pages/RelationStep';
import { TokenProvider } from '../provider/TokenProvider';
import { SchemaProvider } from '../provider/SchemaProvider';
import { MentionSuggestionStep } from '../pages/MentionSuggestionStep';
import { RelationSuggestionStep } from '../pages/RelationSuggestionStep';

export const AnnotationLayout = () => {
  //const { currentStep, handleStepChange } = useStepNavigation();

  return (
    <TokenProvider>
      <SchemaProvider>
        <SelectionProvider>
          <MentionProvider>
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
      </SchemaProvider>
    </TokenProvider>
  )
}

const CurrentStepRender = () => {
  const { currentStep } = useSelection();
  console.log(currentStep)

  switch (currentStep) {
    case 1:
      return <MentionSuggestionStep />
    case 2:
      return <MentionStep />
    case 3: 
      return <RelationSuggestionStep />
    case 4:
      return <RelationStep />
  }
}

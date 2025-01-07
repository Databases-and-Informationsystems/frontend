//import { useStepNavigation } from '../hooks/useStepNavigation';
import { ModeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { SelectionProvider } from '../provider/SelectionProvider';
import { MentionProvider } from '../provider/MentionProvider';
import { AnnotationControlBox } from './AnnotationControlBox';
import { RelationProvider } from '../provider/RelationProvider';
import { MentionStep } from '../pages/MentionStep';
import { RelationStep } from '../pages/RelationStep';
import { TokenProvider } from '../provider/TokenProvider';
import { SchemaProvider } from '../provider/SchemaProvider';
import { MentionSuggestionStep } from '../pages/MentionSuggestionStep';
import { RelationSuggestionStep } from '../pages/RelationSuggestionStep';
import { NavigationHeader } from './NavigationHeader';
import { useStepNavigation } from '../hooks/useStepNavigation';

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
                <NavigationHeader project_name='Test'/>
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
  const { step } = useStepNavigation();
  switch (step) {
    case 'mentionSuggestion':
      return <MentionSuggestionStep />
    case 'mentionEditing':
      return <MentionStep />
    case 'entitySelection': 
      return <div>Entity Selection</div>
    case 'relationSuggestion':
      return <RelationSuggestionStep />
    case 'relationEditing':
      return <RelationStep />
  }
}

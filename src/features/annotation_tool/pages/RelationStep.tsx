import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { AnnotatedText } from '../components/AnnotatedText';
import { RelationContainer } from '../components/RelationContainer';

export const RelationStep = () => {

  return (
    <ResizablePanelGroup direction='horizontal'>
      <ResizablePanel>
        <AnnotatedText showDeleteButton={false}/>
      </ResizablePanel>
      <ResizableHandle withHandle className='bg-transparent'/>
      <ResizablePanel>
        <RelationContainer />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

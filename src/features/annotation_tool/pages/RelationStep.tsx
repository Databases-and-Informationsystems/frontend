import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { AnnotatedText } from '../components/AnnotatedText';
import { RelationContainer } from '../components/RelationContainer';
import { useTokensContext } from '../context/useTokensContext';

export const RelationStep = () => {
  const { tokens } = useTokensContext();

  return (
    <ResizablePanelGroup direction='horizontal'>
      <ResizablePanel>
        <AnnotatedText tokens={tokens}/>
      </ResizablePanel>
      <ResizableHandle withHandle className='bg-transparent'/>
      <ResizablePanel>
        <RelationContainer />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import React from 'react'
import { AnnotatedText } from '../components/AnnotatedText';
import { MOCK_TOKENS } from '@/testing/mocks/documentMocks';
import { RelationContainer } from '../components/RelationContainer';

export const RelationStep = () => {
  const [document] = React.useState({
    tokens: MOCK_TOKENS,
  });

  return (
    <ResizablePanelGroup direction='horizontal'>
      <ResizablePanel>
        <AnnotatedText tokens={document.tokens}/>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <RelationContainer />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

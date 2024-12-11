import React from 'react'
import { AnnotatedText } from '../components/AnnotatedText'
import { MOCK_TOKENS } from '@/testing/mocks/documentMocks';

export const MentionStep = () => {
  const [document] = React.useState({
    tokens: MOCK_TOKENS,
  });

  return (
    <AnnotatedText tokens={document.tokens}/>
  )
}

import { AnnotatedText } from '../components/AnnotatedText'
import { useTokens } from '../hooks/useTokens';

export const MentionStep = () => {
  const { tokens } = useTokens();

  return (
    <>
      <AnnotatedText tokens={tokens} showDeleteButton={true}/>
    </>
  )
}

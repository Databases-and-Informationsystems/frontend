import { AnnotatedText } from '../components/AnnotatedText'
import { useTokens } from '../context/useTokens';

export const MentionStep = () => {
  const { tokens } = useTokens();

  return (
    <>
      <AnnotatedText tokens={tokens} showDeleteButton={true}/>
    </>
  )
}

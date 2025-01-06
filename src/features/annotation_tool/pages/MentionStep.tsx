import { AnnotatedText } from '../components/AnnotatedText'
import { useTokens } from '../hooks/useTokens';

export const MentionStep = () => {
  const { tokens } = useTokens();

  return (
    <>
      <div>Second Step</div>
      <AnnotatedText tokens={tokens} />
    </>
  )
}

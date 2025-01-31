import { AnnotatedText } from '../components/AnnotatedText'
import { useSchema } from '../context/useSchema';
import { useTokens } from '../context/useTokens';

export const MentionStep = () => {
  const { tokens } = useTokens();
  const { loading } = useSchema();

  if (loading) {
    return <p>Loading schema...</p>;
  }


  return (
    <>
      <AnnotatedText tokens={tokens} showDeleteButton={true}/>
    </>
  )
}

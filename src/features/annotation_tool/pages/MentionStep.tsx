import { AnnotatedText } from '../components/AnnotatedText'
import { useSchemaContext } from '../context/useSchemaContext';
import { useTokensContext } from '../context/useTokensContext';

export const MentionStep = () => {
  const { tokens } = useTokensContext();
  const { loading } = useSchemaContext();

  if (loading) {
    return <p>Loading schema...</p>;
  }


  return (
    <>
      <AnnotatedText tokens={tokens} showDeleteButton={true}/>
    </>
  )
}

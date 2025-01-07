import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSelection } from '../hooks/useSelection'
import { Button } from '@/components/ui/button';
import { useMentionContext } from '../context/useMentionContext';
import { useRelationContext } from '../context/useRelationContext';
import { getMatchingConstraints } from '../utils/getMatchingConstraints';
import { useSchema } from '../hooks/useSchema';
import { useStepNavigation } from '../hooks/useStepNavigation';

export const AnnotationControlBox = () => {
  const { selectedTokens, selectedMentions, resetTokens, resetMentions } = useSelection();
  const { mentions, handleCreateMention, handleUpdateMention } = useMentionContext();
  const { step } = useStepNavigation();
  const { handleCreateRelation } = useRelationContext();
  const { schema } = useSchema();

  const createMention = (tokens: string[], tag: string) => {
    handleCreateMention({
      id: String(Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)),
      tag: tag,
      isShownRecommendation: false,
      token_ids: tokens
    })
    resetTokens()
  }


  const getMentionById = (id: string) => {
    return mentions.find(mention => mention.id === id)
  }


  const updateMention = (mentionId: string, tag: string) => {
    let mentionToUpdate = getMentionById(mentionId)
    if (!mentionToUpdate) return
    mentionToUpdate = {
      ...mentionToUpdate,
      tag: tag
    }
    handleUpdateMention(mentionToUpdate.id, mentionToUpdate)
    resetMentions()
  }


  const createRelation = (mentionIds: string[], tag: string) => {
    handleCreateRelation({
      id: String(Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)),
      tag,
      isDirected: false,
      isShownRecommendation: false,
      mention_head_id: mentionIds[0],
      mention_tail_id: mentionIds[1],
    });
    resetMentions();
  }


  if (step === 'mentionEditing' && selectedTokens.length > 0) {
    return (
      <Card className='absolute top-0'>
        <CardHeader>
          <CardTitle>
            Create Mention
          </CardTitle>
          <CardContent>
            <div>
              {schema?.mentions.map((mention) => (
                <Button
                  onClick={() => createMention(selectedTokens, mention.tag)}
                  key={mention.id}
                  className='mr-2'
                  style={{ backgroundColor: mention.color }}>
                  {mention.tag}
                </Button>
              ))}
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    )
  }
  if (step === 'mentionEditing' && selectedMentions.length > 0) {
    return (
      <Card className='absolute top-0'>
        <CardHeader>
          <CardTitle>
            Update Mention
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            {schema?.mentions.map((mention) => (
              <Button
                onClick={() => updateMention(selectedMentions[0], mention.tag)}
                key={mention.id}
                className='mr-2'
                style={{ backgroundColor: mention.color }}>
                {mention.tag}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }
  if (step === 'relationEditing' && selectedMentions.length === 2) {
    const mentionHead = getMentionById(selectedMentions[0]);
    const mentionTail = getMentionById(selectedMentions[1]);

    if (!mentionHead || !mentionTail) {
      return;
    }

    const matchingConstraints = getMatchingConstraints(
      mentionHead,
      mentionTail,
      schema!.dependencies,
      schema!.mentions
    );

    if (matchingConstraints.length === 0) {
      return (
        <Card className="absolute top-0">
          <CardHeader>
            <CardTitle>Create Relation</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              You can't build a relation from the selected mentions.
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className='absolute top-0'>
        <CardHeader>
          <CardTitle>
            Create Relation
          </CardTitle>
        </CardHeader>
        <CardContent>
          {matchingConstraints.map((constraint) => {
            const relation = schema?.relations.find(
              (relation) => relation.id === constraint.schema_relation_id
            );
            return (
              <Button
                key={constraint.id}
                onClick={() => createRelation(selectedMentions, relation?.tag || '')}
                className='mr-2'>
                {relation?.tag || ''}
              </Button>
            );
          })}
        </CardContent>
      </Card>
    )
  }
}

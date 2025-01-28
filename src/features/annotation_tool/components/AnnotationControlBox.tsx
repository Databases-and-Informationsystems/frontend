import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSelection } from '../hooks/useSelection'
import { Button } from '@/components/ui/button';
import { useMentionContext } from '../context/useMentionContext';
import { useRelationContext } from '../context/useRelationContext';
import { getMatchingConstraints } from '../utils/getMatchingConstraints';
import { useSchema } from '../hooks/useSchema';
import { CreateMentionPayload, Mention, Token, UpdateMentionPayload } from '../types';

export const AnnotationControlBox = () => {
  const { currentStep, selectedTokens, selectedMentions, resetTokens, resetMentions } = useSelection();
  const { mentions, handleCreateMention, handleUpdateMention } = useMentionContext();
  const { handleCreateRelation } = useRelationContext();
  const { schema } = useSchema();

  const createMention = (tokens: Token[], schemaId: number) => {
    const payload: CreateMentionPayload = {
      schema_mention_id: schemaId,
      document_edit_id: 0, // Access document_edit_id from context
      token_ids: tokens.map(token => token.id),
    };
    handleCreateMention(payload);
    resetTokens()
  }


  const getMentionById = (id: number) => {
    return mentions.find(mention => mention.id === id)
  }

  const updateMention = (mention: Mention, schemaId: number) => {
    const payload: UpdateMentionPayload = {
      schmea_mention_id: schemaId,
      token_ids: mention.tokens.map(token => token.id),
      entity_id: mention.entity_id,
    }
    handleUpdateMention(mention.id, payload);
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


  if (currentStep === 2 && selectedTokens.length > 0) {
    return (
      <Card className='absolute top-0'>
        <CardHeader>
          <CardTitle>
            Create Mention
          </CardTitle>
          <CardContent>
            <div>
              {schema?.schema_mentions.map((schemaMention) => (
                <Button
                  onClick={() => createMention(selectedTokens, schemaMention.id)}
                  key={schemaMention.id}
                  className='mr-2'
                  style={{ backgroundColor: schemaMention.color }}>
                  {schemaMention.tag}
                </Button>
              ))}
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    )
  }
  if (currentStep === 2 && selectedMentions.length > 0) {
    return (
      <Card className='absolute top-0'>
        <CardHeader>
          <CardTitle>
            Update Mention
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            {schema?.schema_mentions.map((schemaMention) => (
              <Button
                onClick={() => updateMention(selectedMentions[0], schemaMention.id)}
                key={schemaMention.id}
                className='mr-2'
                style={{ backgroundColor: schemaMention.color }}>
                {schemaMention.tag}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }
  if (currentStep === 4 && selectedMentions.length === 2) {
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

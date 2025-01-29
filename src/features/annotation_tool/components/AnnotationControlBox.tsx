import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSelection } from '../hooks/useSelection'
import { Button } from '@/components/ui/button';
import { useMentionContext } from '../context/useMentionContext';
import { useRelationContext } from '../context/useRelationContext';
import { getMatchingConstraints } from '../utils/getMatchingConstraints';
import { useSchema } from '../hooks/useSchema';
import { useStepNavigation } from '../hooks/useStepNavigation';
import { CreateMentionPayload, CreateRelationPayload, Mention, Token, UpdateMentionPayload } from '../types';

export const AnnotationControlBox = () => {
  const { selectedTokens, selectedMentions, resetTokens, resetMentions } = useSelection();
  const { mentions, handleCreateMention, handleUpdateMention } = useMentionContext();
  const { step } = useStepNavigation();
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


  const createRelation = (mentions: Mention[], schemaId: number) => {
    const payload: CreateRelationPayload = {
      schema_relation_id: schemaId,
      document_edit_id: 0, // Access document_edit_id from context
      isDirected: false, // Access isDirected from context
      mention_head_id: mentions[0].id,
      mention_tail_id: mentions[1].id,
    }
    handleCreateRelation(payload);
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
            const relation = schema?.schema_relations.find(
              (schemaRelation) => schemaRelation.id === constraint.schema_relation_id
            );
            return (
              <Button
                key={constraint.id}
                onClick={() => createRelation(selectedMentions, relation?.id || '')}
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

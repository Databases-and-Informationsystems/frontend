import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSelectionContext } from '../context/useSelectionContext'
import { Button } from '@/components/ui/button';
import { useMentionContext } from '../context/useMentionContext';
import { useRelationContext } from '../context/useRelationContext';
import { getMatchingConstraints } from '../utils/getMatchingConstraints';
import { useSchemaContext } from '../context/useSchemaContext';

import { useParams } from 'react-router-dom';
import { useWorkflowContext } from '../context/useWorkflowContext';
import { Token } from '../types';
import { CreateMentionPayload, Mention, UpdateMentionPayload } from '../types/mention';
import { CreateRelationPayload } from '../types/relation';

export const AnnotationControlBox = () => {
  const { selectedTokens, selectedMentions, resetTokens, resetMentions } = useSelectionContext();
  const { handleCreateMention, handleUpdateMention } = useMentionContext();
  const { currentStep } = useWorkflowContext();
  const { handleCreateRelation } = useRelationContext();
  const { schema, loading, error } = useSchemaContext();
  const { id } = useParams();

  if (loading) {
    return <div>Loading schema...</div>;
  }

  if (error) {
    return <div>Error Schema: {error}</div>;
  }

  const createMention = (tokens: Token[], schemaId: number) => {
    const payload: CreateMentionPayload = {
      schema_mention_id: schemaId,
      document_edit_id: Number(id),
      token_ids: tokens.map(token => token.id),
    };
    handleCreateMention(payload);
    resetTokens()
  }

  const updateMention = (mention: Mention, schemaId: number) => {
    const payload: UpdateMentionPayload = {
      schema_mention_id: schemaId,
      token_ids: mention.tokens.map(token => token.id),
    }
    handleUpdateMention(mention.id, payload);
    resetMentions()
  }

  const extendMention = (mention: Mention, token: Token) => {
    const payload: UpdateMentionPayload = {
      token_ids: [...mention.tokens.map(t => t.id), token.id],
    };
  
    handleUpdateMention(mention.id, payload);
    resetTokens();
    resetMentions();
  };


  const createRelation = (mentions: Mention[], schemaId: number) => {
    const payload: CreateRelationPayload = {
      schema_relation_id: schemaId,
      document_edit_id: Number(id),
      mention_head_id: mentions[0].id,
      mention_tail_id: mentions[1].id,
    }
    handleCreateRelation(payload);
    resetMentions();
  }


  if (currentStep === 'MENTIONS') {
    if (selectedMentions.length === 1 && selectedTokens.length === 1) {
      const mentionToExtend = selectedMentions[0];
      const tokenToAdd = selectedTokens[0];
      const canExtend = canExtendMentionWithToken(mentionToExtend, tokenToAdd);
  
      if (canExtend) {
        return (
          <Card className='absolute top-0'>
            <CardHeader>
              <CardTitle>Extend Mention</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Selected Mention ID: {mentionToExtend.id} – Extend by Token {tokenToAdd.id}?</p>
              <Button
                onClick={() => extendMention(mentionToExtend, tokenToAdd)}
                className='mr-2'
              >
                Extend
              </Button>
            </CardContent>
          </Card>
        );
      } else {
        return (
          <Card className='absolute top-0'>
            <CardHeader>
              <CardTitle>Extend Mention</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Token is not adjacent to the selected Mention.</p>
            </CardContent>
          </Card>
        );
      }
    }
  
    if (selectedTokens.length > 0 && selectedMentions.length === 0) {
      return (
        <Card className='absolute top-0'>
          <CardHeader>
            <CardTitle>Create Mention</CardTitle>
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

    if (selectedMentions.length === 1 && selectedTokens.length === 0) {
      return (
        <Card className='absolute top-0'>
          <CardHeader>
            <CardTitle>Update Mention</CardTitle>
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
  }
  if (currentStep === 'RELATIONS' && selectedMentions.length === 2) {
    const mentionHead = selectedMentions[0];
    const mentionTail = selectedMentions[1];

    if (!mentionHead || !mentionTail) {
      return;
    }

    const matchingConstraints = getMatchingConstraints(
      mentionHead,
      mentionTail,
      schema!.schema_constraints
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
              (schemaRelation) => schemaRelation.id === constraint.schema_relation.id
            );
            return (
              <Button
                key={constraint.id}
                onClick={() => createRelation(selectedMentions, constraint.schema_relation.id)}
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

function canExtendMentionWithToken(mention: Mention, token: Token): boolean {
  const mentionTokens = mention.tokens;

  if (mentionTokens.length === 0) return false;

  const docIndices = mentionTokens.map((t) => t.document_index);
  const minIndex = Math.min(...docIndices);
  const maxIndex = Math.max(...docIndices);

  if (mentionTokens[0].sentence_index !== token.sentence_index) {
    return false;
  }
  return (
    token.document_index === minIndex - 1 ||
    token.document_index === maxIndex + 1
  );
}
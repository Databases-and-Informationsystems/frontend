import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { useSelection } from '../hooks/useSelection'
import { Button } from '@/components/ui/button';
import { MOCK_MENTION_SCHEMA, MOCK_RELATION_SCHEMA, MOCK_SCHEMA_DEPENDENCIES } from '@/testing/mocks/documentMocks';
import { useMentionContext } from '../context/useMentionContext';
import { useRelationContext } from '../context/useRelationContext';
import { getMatchingConstraints } from '../utils/getMatchingConstraints';

export const AnnotationControlBox = () => {
  const { currentStep, selectedTokens, selectedMentions, resetTokens, resetMentions } = useSelection();
  const { mentions, createMention, updateMention } = useMentionContext();
  const { createRelation } = useRelationContext();
  const [schema] = React.useState({
    schemaMentions: MOCK_MENTION_SCHEMA,
    schemaRelations: MOCK_RELATION_SCHEMA,
    schemaConstraints: MOCK_SCHEMA_DEPENDENCIES
  })

  const handleCreateMention = (tokens: number[], tag: string) => {
    createMention({
      id: Math.floor(Math.random() * (9999 - 1000 + 1) + 1000),
      tag: tag,
      isShownRecommendation: false,
      token_ids: tokens
    })
    resetTokens()
  }


  const getMentionById = (id: number) => {
    return mentions.find(mention => mention.id === id)
  }


  const handleUpdateMention = (mentionId: number, tag: string) => {
    let mentionToUpdate = getMentionById(mentionId)
    if (!mentionToUpdate) return
    mentionToUpdate = {
      ...mentionToUpdate,
      tag: tag
    }
    updateMention(mentionToUpdate.id, mentionToUpdate)
    resetMentions()
  }


  const handleCreateRelation = (mentionIds: number[], tag: string) => {
    createRelation({
      id: Math.floor(Math.random() * (9999 - 1000 + 1) + 1000),
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
              {schema.schemaMentions.map((mention) => (
                <Button
                  onClick={() => handleCreateMention(selectedTokens, mention.tag)}
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
            {schema.schemaMentions.map((mention) => (
              <Button
                onClick={() => handleUpdateMention(selectedMentions[0], mention.tag)}
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
  if (currentStep === 3 && selectedMentions.length === 2) {
    const mentionHead = getMentionById(selectedMentions[0]);
    const mentionTail = getMentionById(selectedMentions[1]);

    if (!mentionHead || !mentionTail) {
      return;
    }

    const matchingConstraints = getMatchingConstraints(
      mentionHead,
      mentionTail,
      schema.schemaConstraints,
      schema.schemaMentions
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
            const relation = schema.schemaRelations.find(
              (relation) => relation.id === constraint.schema_relation_id
            );
            return (
              <Button
                key={constraint.id}
                onClick={() => handleCreateRelation(selectedMentions, relation?.tag || '')}
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

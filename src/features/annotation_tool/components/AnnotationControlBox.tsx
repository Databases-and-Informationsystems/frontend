import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { useSelection } from '../hooks/useSelection'
import { Button } from '@/components/ui/button';
import { MOCK_MENTION_SCHEMA } from '@/testing/mocks/documentMocks';
import { useMentionContext } from '../context/useMentionContext';

export const AnnotationControlBox = () => {
  const { selectedTokens, selectedMentions, resetTokens, resetMentions } = useSelection();
  const { mentions, createMention, updateMention } = useMentionContext();
  const [schema] = React.useState({
    schemaMentions: MOCK_MENTION_SCHEMA
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


  if (selectedTokens.length > 0) {
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
  if (selectedMentions.length > 0) {
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
}

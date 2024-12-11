import React from 'react'
import { Mention as MentionType } from '../types/mention'
import { Badge } from '@/components/ui/badge';
import { useSelection } from '../hooks/useSelection';
import { useMentionContext } from '../context/useMentionContext';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { MOCK_MENTION_SCHEMA, MOCK_TOKENS } from '@/testing/mocks/documentMocks';

interface MentionProps {
  mention: MentionType;
  showDeleteButton?: boolean;
}

export const Mention = ({ mention, showDeleteButton = true }: MentionProps) => {
  const { selectedMentions, handleMentionClick } = useSelection();
  const { deleteMention } = useMentionContext();

  const [document] = React.useState({
    tokens: MOCK_TOKENS,
  });

  const [schema] = React.useState({
    schemaMentions: MOCK_MENTION_SCHEMA
  })

  const isSelected = selectedMentions.includes(mention.id);

  const getMentionColor = (tag: string) => {
    const mention = schema.schemaMentions.find(mention => mention.tag === tag)
    return mention ? mention.color : '#000'
  }


  const mentionTokens = document.tokens.filter((token) => (
    mention.token_ids.includes(token.id)
  ));


  return (
    <span className={`select-none cursor-pointer inline-flex items-center p-1 text-xl font-semibold border rounded-lg ${isSelected ? 'border-gray-300 border-4' : 'border-gray-300'}`}
      onClick={() => handleMentionClick(mention.id)}
      style={{ backgroundColor: getMentionColor(mention.tag) }}
    >
      <span>
        {mentionTokens.map((token) => (
          <span key={token.id}>
            {token.text}
            &nbsp;
          </span>
        ))}
      </span>
      &nbsp;
      <Badge>
        {mention.tag}
      </Badge>
      &nbsp;
      {showDeleteButton && (<Button className="h-auto w-auto p-1"
        onClick={(e) => {
          e.stopPropagation();
          deleteMention(mention.id)
        }}>
        <Trash2 />
      </Button>)}
    </span>
  )
}

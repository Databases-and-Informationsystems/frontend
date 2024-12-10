import React from 'react'
import { Mention as MentionType } from '../types/mention'
import { Token as TokenType } from '../types/token';
import { Badge } from '@/components/ui/badge';
import { useSelection } from '../hooks/useSelection';
import { useMentionContext } from '../context/useMentionContext';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { MOCK_MENTION_SCHEMA } from '@/testing/mocks/documentMocks';

interface MentionProps {
  mention: MentionType;
  tokens: TokenType[];
}

export const Mention = ({ mention, tokens }: MentionProps) => {
  const { selectedMentions, handleMentionClick } = useSelection();
  const { deleteMention } = useMentionContext();

  const [schema] = React.useState({
    schemaMentions: MOCK_MENTION_SCHEMA
  })

  const isSelected = selectedMentions.includes(mention.id);

  const getMentionColor = (tag: string) => {
    const mention = schema.schemaMentions.find(mention => mention.tag === tag)
    return mention ? mention.color : '#000'
  }


  return (
    <span className={`select-none cursor-pointer inline-flex items-center p-1 text-xl font-semibold border rounded-lg ${isSelected ? 'border-gray-300 border-4' : 'border-gray-300'}`}
      onClick={() => handleMentionClick(mention.id)}
      style={{ backgroundColor: getMentionColor(mention.tag) }}
    >
      <span>
        {tokens.map((token) => (
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
      <Button className="h-auto w-auto p-1"
        onClick={(e) => {
          e.stopPropagation();
          deleteMention(mention.id)
        }}>
        <Trash2 />
      </Button>
    </span>
  )
}

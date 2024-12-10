import React from 'react'
import { Mention as MentionType } from '../types/mention'
import { Token as TokenType } from '../types/token';
import { Badge } from '@/components/ui/badge';
import { useSelection } from '../provider/useSelection';

interface MentionProps {
  mention: MentionType;
  tokens: TokenType[];
}

export const Mention = ({ mention, tokens }: MentionProps) => {
  const { selectedMentions, handleMentionClick } = useSelection();

  const isSelected = selectedMentions.includes(mention.id);


  return (
    <span className={`select-none cursor-pointer inline-flex items-center p-1 text-xl font-semibold border rounded-lg ${isSelected ? 'border-green-500 bg-green-200' : 'border-gray-300'}`}
      onClick={() => handleMentionClick(mention.id)}
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

    </span>
  )
}
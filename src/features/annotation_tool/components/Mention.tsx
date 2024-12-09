import React from 'react'
import { Mention as MentionType } from '../types/mention'
import { Token as TokenType } from '../types/token';
import { Badge } from '@/components/ui/badge';

interface MentionProps {
  mention: MentionType;
  tokens: TokenType[];
}

export const Mention = ({ mention, tokens }: MentionProps) => {
  return (
    <span className="inline-flex items-center p-1 text-xl font-semibold border rounded-lg">
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

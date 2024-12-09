import React from 'react'
import { Mention as MentionType } from '../types/mention'
import { Token as TokenType } from '../types/token';

interface MentionProps {
    mention: MentionType;
    tokens: TokenType[];
}

export const Mention = ({ mention, tokens }: MentionProps) => {
  return (
    <span>
        <span>
            {tokens.map((token) => (
                <span key={token.id}>
                    {token.text}
                </span>
            ))}
        </span>
      {mention.tag}
    </span>
  )
}

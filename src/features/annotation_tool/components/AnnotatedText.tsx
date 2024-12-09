import React from 'react'
import { Mention as MentionType, Token as TokenType } from '../types'
import { Mention } from './Mention';
import { Token } from './Token';

interface AnnotatedTextProps {
    tokens: TokenType[];
    mentions: MentionType[];
}

export const AnnotatedText = ({ tokens, mentions }: AnnotatedTextProps) => {

  const getMentionByTokenId = (tokenId: number): MentionType | undefined => (
    mentions.find(mention => mention.token_ids.includes(tokenId)));

  const renderedTokenIds = new Set<number>();

  const renderAnnotatedText = () => {
    return tokens.map((token) => {
      if (renderedTokenIds.has(token.id)) {
        return null;
      }

      const mention = getMentionByTokenId(token.id);

      if (mention) {
        const mentionTokens = tokens.filter((token) => (
          mention.token_ids.includes(token.id)
        ));

        mentionTokens.forEach((token) => renderedTokenIds.add(token.id));

        return (
          <Mention
            key={token.id}
            mention={mention}
            tokens={mentionTokens}
          />
        );
      }

      renderedTokenIds.add(token.id);
      return <Token key={token.id} token={token} />;
    })
  }

  return (
    <div>
      {renderAnnotatedText()}
    </div>
  )
}

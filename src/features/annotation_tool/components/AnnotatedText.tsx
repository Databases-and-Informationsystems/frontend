import React from 'react'
import { Mention as MentionType, Token as TokenType } from '../types'
import { Mention } from './Mention';
import { Token } from './Token';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AnnotatedTextProps {
  tokens: TokenType[];
  mentions: MentionType[];
}

export const AnnotatedText = ({ tokens, mentions }: AnnotatedTextProps) => {

  // Find mention by token id
  const getMentionByTokenId = (tokenId: number): MentionType | undefined => (
    mentions.find(mention => mention.token_ids.includes(tokenId)));

  // Group tokens by sentence index
  const groupedTokensBySentence = tokens.reduce((acc, token) => {
    if (!acc[token.sentence_index]) {
      acc[token.sentence_index] = [];
    }
    acc[token.sentence_index].push(token);
    return acc;
  }, {} as Record<number, TokenType[]>);

  // Render each sentence with its tokens and mentions
  const renderAnnotatedSentence = (sentenceTokens: TokenType[]) => {
    const renderedTokenIds = new Set<number>();

    return sentenceTokens.map((token) => {
      if (renderedTokenIds.has(token.id)) {
        return null;
      }

      const mention = getMentionByTokenId(token.id);

      if (mention) {
        const mentionTokens = sentenceTokens.filter((token) => (
          mention.token_ids.includes(token.id)
        ));

        mentionTokens.forEach((token) => renderedTokenIds.add(token.id));

        return (
          <>
            <Mention
              key={token.id}
              mention={mention}
              tokens={mentionTokens}
            />
            &nbsp;
          </>
        );
      }

      renderedTokenIds.add(token.id);
      return (
        <>
          <Token key={token.id} token={token} />
          &nbsp;
        </>
      );
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Annotated Text</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(groupedTokensBySentence).map(([index, sentenceTokens]) => (
          <div key={`sentence-${index}`}>
            {renderAnnotatedSentence(sentenceTokens)}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
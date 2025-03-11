import React from 'react';
import { Token } from './Token';
import { Mention as MentionType } from '../types/mention';
import { Token as TokenType } from '../types/token';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMentionContext } from '../context/useMentionContext';
import { EnhancedMention } from './EnhancedMention';
import { useTokensContext } from '../context/useTokensContext';

interface AnnotatedTextProps {
  showDeleteButton?: boolean;
}

export const AnnotatedText = ({ showDeleteButton }: AnnotatedTextProps) => {
  const { mentions } = useMentionContext();
  const { tokens } = useTokensContext();

  const getMentionByTokenId = (tokenId: number): MentionType | undefined =>
    mentions.find((mention) =>
      mention.tokens.some((token) => token.id === tokenId)
    );

  // Group tokens by sentence index
  const groupedTokensBySentence = tokens.reduce(
    (acc, token) => {
      if (!acc[token.sentence_index]) {
        acc[token.sentence_index] = [];
      }
      acc[token.sentence_index].push(token);
      return acc;
    },
    {} as Record<number, TokenType[]>
  );

  // Render each sentence with its tokens and mentions
  const renderAnnotatedSentence = (sentenceTokens: TokenType[]) => {
    const renderedTokenIds = new Set<number>();

    return sentenceTokens.map((token) => {
      if (renderedTokenIds.has(token.id)) {
        return null;
      }

      const mention = getMentionByTokenId(token.id);

      if (mention) {
        const mentionTokens = sentenceTokens.filter((token) =>
          mention.tokens.some((mentionToken) => mentionToken.id === token.id)
        );

        mentionTokens.forEach((token) => renderedTokenIds.add(token.id));

        return (
          <React.Fragment key={`mention-fragment-${token.id}`}>
            <EnhancedMention
              key={`mention-${mention.id}`}
              mention={mention}
              showDeleteButton={showDeleteButton}
            />
            &nbsp;
          </React.Fragment>
        );
      }
      renderedTokenIds.add(token.id);
      return (
        <React.Fragment key={`token-fragment-${token.id}`}>
          <Token key={token.id} token={token} />
        </React.Fragment>
      );
    });
  };

  return (
    <div className="p-6">
      {Object.entries(groupedTokensBySentence).flatMap(
        ([index, sentenceTokens]) => (
          <div
            key={`sentence-${index}`}
            className="flex items-start flex-wrap mb-1"
          >
            {renderAnnotatedSentence(sentenceTokens)}
          </div>
        )
      )}
    </div>
  );
};

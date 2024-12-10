import React from 'react'
import { Token as TokenType } from '../types/token'
import { useSelection } from '../hooks/useSelection';

interface TokenProps {
    token: TokenType;
}


export const Token = ({ token }: TokenProps) => {
  const { selectedTokens, handleTokenClick } = useSelection();

  const isSelected = selectedTokens.includes(token.id);

  return (
    <span className={`select-none text-lg font-semibold cursor-pointer ${isSelected ? 'bg-blue-200' : ''}`}
      onClick={() => handleTokenClick(token.id, token.sentence_index)}
    >
      {token.text}
    </span>
  )
}

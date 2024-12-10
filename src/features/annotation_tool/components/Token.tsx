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
    <span className={`select-none text-xl font-semibold cursor-pointer ${isSelected ? 'border rounded-lg border-gray-300 p-1' : ''}`}
      onClick={() => handleTokenClick(token.id, token.sentence_index)}
    >
      {token.text}
    </span>
  )
}

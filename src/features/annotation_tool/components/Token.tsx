import React from 'react'
import { Token as TokenType } from '../types/token'

interface TokenProps {
    token: TokenType;
}


export const Token = ({ token }: TokenProps) => {
  return (
    <span className='text-lg font-semibold'>
      {token.text}
    </span>
  )
}

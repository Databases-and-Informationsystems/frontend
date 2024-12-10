import { useContext } from 'react'
import MentionContext from '../provider/MentionProvider'

export const useMentionContext = () => {
  const context = useContext(MentionContext)
  if (!context) {
    throw new Error('useMentionContext must be used within MentionProvider')
  }
  return context
}

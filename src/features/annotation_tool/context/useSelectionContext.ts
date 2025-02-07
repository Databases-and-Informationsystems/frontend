import { useContext } from 'react'
import SelectionContext from '../provider/SelectionProvider'

export const useSelectionContext = () => {
  const context = useContext(SelectionContext)
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider')
  }
  return context
}

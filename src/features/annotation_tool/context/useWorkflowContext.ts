import { useContext } from 'react'
import WorkflowContext from '../provider/WorkflowProvider'

export const useWorkflowContext = () => {
  const context = useContext(WorkflowContext)
  if (!context) {
    throw new Error('useWorkflow must be used within a WorkflowProvider')
  }
  return context
}

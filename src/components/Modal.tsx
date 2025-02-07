/**
 * TODO this modal component does not yet work as expected.
 * The Modal is for example not scrollabe, but the background behind is...
 * If it is possible to use the ShadCn Dialog instead in a very generic way,
 * this would be a better way to go
 */

import { ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  description?: string
  size?: 's' | 'm' | 'l' | 'xl'
}

const sizes = {
  s: '20rem',
  m: '30rem',
  l: '50rem',
  xl: '70rem',
}

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  description,
  size = 'm',
}: ModalProps) => {
  if (!isOpen) return null
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`p-6 overflow-y-scroll max-h-full`}
        style={{ maxWidth: sizes[size] }}
      >
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
export default Modal

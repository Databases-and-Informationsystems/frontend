import { ReactNode, useEffect, useRef } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  size?: 's' | 'm' | 'l' | 'xl'
}

const sizes = {
  s: '20rem',
  m: '30rem',
  l: '50rem',
  xl: '70rem',
}

const Modal = ({ isOpen, onClose, children, size = 'm' }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null)

  // Close modal when clicking outside the modal content
  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose()
    }
  }

  // Close modal when pressing Escape
  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    if (isOpen) {
      // Listen for outside clicks and Escape key press when modal is open
      document.addEventListener('click', handleOutsideClick)
      document.addEventListener('keydown', handleEscapeKey)
    } else {
      // Cleanup listeners when modal is closed
      document.removeEventListener('click', handleOutsideClick)
      document.removeEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out opacity-100 z-50"
      role="dialog"
      aria-labelledby="modal-title"
      aria-hidden={!isOpen}
    >
      <div
        className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full`}
        style={{ maxWidth: sizes[size] }}
        role="document"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {children}
      </div>
    </div>
  )
}

export default Modal

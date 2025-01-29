import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const EmailLink: React.FC<{ email: string; label?: string }> = ({
  email,
  label,
}) => {
  return (
    <a href={`mailto:${email}`} className="text-blue-500 underline">
      {label || <FontAwesomeIcon icon={faEnvelope} />}
    </a>
  )
}

export default EmailLink

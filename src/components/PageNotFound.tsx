import React from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

export const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Button variant="default">
        <Link to="/dashboard">
          Go to Dashboard
        </Link>
      </Button>
    </div>
  )
}

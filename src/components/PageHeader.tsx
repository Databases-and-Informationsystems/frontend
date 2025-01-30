import React from 'react'

const PageHeader: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
        {title}
      </h1>
    </div>
  )
}

export default PageHeader

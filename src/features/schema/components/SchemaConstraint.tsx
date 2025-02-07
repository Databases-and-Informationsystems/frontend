import React from 'react'

interface SchemaConstraintProps {
  mention_head_color?: string
  mention_head_tag?: string
  is_directed: boolean
  relation_tag?: string
  mention_tail_tag?: string
  mention_tail_color?: string
}

const SchemaConstraint: React.FC<SchemaConstraintProps> = ({
  mention_head_color,
  mention_head_tag,
  is_directed,
  relation_tag,
  mention_tail_tag,
  mention_tail_color,
}) => {
  const renderArrow = (direction: 'left' | 'right') => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`w-6 h-6 ${direction === 'left' ? 'transform rotate-180' : ''}`}
    >
      <path d="M12 2v20M5 12l7-7 7 7" />
    </svg>
  )
  return (
    <div className="grid grid-cols-3 items-center p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-md dark:border-gray-700">
      {/* Head Mention Tag (Left) */}
      <div className="flex items-center justify-start space-x-4">
        <div
          className="w-6 h-6 rounded min-w-[1.5rem]"
          style={{
            backgroundColor: mention_head_color,
          }}
        ></div>
        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {mention_head_tag}
        </div>
      </div>

      {/* Relation Tag (Center) */}
      <div className="flex justify-center items-center space-x-2">
        {!is_directed && renderArrow('right')}
        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {relation_tag}
        </div>
        {!is_directed && renderArrow('left')}
      </div>

      {/* Tail Mention Tag (Right) */}
      <div className="flex items-center justify-end space-x-4">
        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {mention_tail_tag}
        </div>
        <div
          className="w-6 h-6 rounded min-w-[1.5rem]"
          style={{
            backgroundColor: mention_tail_color,
          }}
        ></div>
      </div>
    </div>
  )
}

export default SchemaConstraint

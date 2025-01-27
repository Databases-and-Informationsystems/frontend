import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { STATUS_STYLES } from '../types/types'
import { Document } from '../types/types'

interface StatusFilterProps {
  documents: Document[]
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  documents,
}: StatusFilterProps) => {
  const new_documents: Document[] = documents.filter(
    (d) => d.state.type === 'NEW'
  )

  const ongoing_documents: Document[] = documents.filter(
    (d) => d.state.type == 'IN_PROGRESS'
  )

  const completed_docs: Document[] = documents.filter(
    (d) => d.state.type === 'FINISHED'
  )
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <Accordion type="single" collapsible>
        <AccordionItem value="ongoing">
          <AccordionTrigger
            className={`text-xl font-bold ${STATUS_STYLES.NEW}`}
            disabled={!new_documents.length}
          >
            New Documents ({new_documents.length})
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {new_documents.map((doc, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-300 rounded-lg shadow-md p-4"
                >
                  <p className="font-semibold text-gray-800">
                    Document: {doc.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Project: {doc.project.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Schema: {doc.schema.name}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="w-full h-2 bg-green-100 rounded-full mr-4">
                      <div className="h-full bg-green-500 rounded-full"></div>
                    </div>
                    <Button variant="outline">Continue Working</Button>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="open">
          <AccordionTrigger
            className={`text-xl font-bold ${STATUS_STYLES.IN_PROGRESS}`}
            disabled={!ongoing_documents.length}
          >
            Ongoing Documents ({ongoing_documents.length})
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ongoing_documents.map((doc, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-300 rounded-lg shadow-md p-4"
                >
                  <p className="font-semibold text-gray-800">
                    Document: {doc.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Project: {doc.project.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Schema: {doc.schema.name}
                  </p>
                  <Button variant="outline">Start Working</Button>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="completed">
          <AccordionTrigger
            className={`text-xl font-bold ${STATUS_STYLES.FINISHED}`}
            disabled={!completed_docs.length}
          >
            Completed Documents ({completed_docs.length})
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {completed_docs.map((doc, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-300 rounded-lg shadow-md p-4"
                >
                  <p className="font-semibold text-gray-800">
                    Document: {doc.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Project: {doc.project.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Schema: {doc.schema.name}
                  </p>
                  <Button variant="outline">Open Document</Button>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default StatusFilter

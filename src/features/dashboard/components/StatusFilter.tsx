import React from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { STATUS_STYLES } from "../types/types";
import { Document, Project } from "../types/types";

interface StatusFilterProps {
  projects: Project[];
  }

const StatusFilter: React.FC<StatusFilterProps> = ({ projects }) => {
  const ongoingDocs : Document[]=projects.flatMap((project) =>
    project.documents.ongoing.map((doc) => ({
      ...doc,
      project: project,
      schema: project.schema,
      status: "Ongoing",
      progress: project.progress,
    }))
  );

  const openDocs : Document[]=projects.flatMap((project) =>
    project.documents.open.map((doc) => ({
      ...doc,
      project: project,
      schema: project.schema,
      status: "Open",
    }))
  );

  const completedDocs : Document[]=projects.flatMap((project) =>
    project.documents.completed.map((doc) => ({
      ...doc,
      project: project,
      schema: project.schema,
      status: "Completed",
    }))
  );

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <Accordion type="single" collapsible>
        <AccordionItem value="ongoing">
          <AccordionTrigger className={`text-xl font-bold ${STATUS_STYLES.Ongoing}`}>
            Ongoing Documents
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ongoingDocs.map((doc, index) => (
                <div key={index} className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
                  <p className="font-semibold text-gray-800">Document: {doc.name}</p>
                  <p className="text-sm text-gray-600">Project: {doc.project.title}</p>
                  <p className="text-sm text-gray-600">Schema: {doc.schema.name}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="w-full h-2 bg-green-100 rounded-full mr-4">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${doc.progress}%` }}
                      ></div>
                    </div>
                    <Button variant="outline">Continue Working</Button>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="open">
          <AccordionTrigger className={`text-xl font-bold ${STATUS_STYLES.Open}`}>
            Open Documents
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {openDocs.map((doc, index) => (
                <div key={index} className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
                  <p className="font-semibold text-gray-800">Document: {doc.name}</p>
                  <p className="text-sm text-gray-600">Project: {doc.project.title}</p>
                  <p className="text-sm text-gray-600">Schema: {doc.schema.name}</p>
                  <Button variant="outline">Start Working</Button>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="completed">
          <AccordionTrigger className={`text-xl font-bold ${STATUS_STYLES.Completed}`}>
            Completed Documents
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedDocs.map((doc, index) => (
                <div key={index} className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
                  <p className="font-semibold text-gray-800">Document: {doc.name}</p>
                  <p className="text-sm text-gray-600">Project: {doc.project.title}</p>
                  <p className="text-sm text-gray-600">Schema: {doc.schema.name}</p>
                  <Button variant="outline">Open Document</Button>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default StatusFilter;

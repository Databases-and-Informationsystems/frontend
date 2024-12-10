import React from "react";
import { Button } from "@/components/ui/button";
import { Document } from "../types/types"; 
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface StatusFilterProps {
  projects: {
    title: string;
    schema?: string;
    documents: {
      ongoing: Document[];
      open: Document[];
      completed: Document[];
    };
    progress:number;
  }[];
}

const StatusFilter: React.FC<StatusFilterProps> = ({ projects }) => {
  const ongoingDocs = projects.flatMap((project) =>
    project.documents.ongoing.map((doc) => ({
      ...doc,
      project: project.title,
      schema: project.schema,
      status: "Ongoing",
      progress: project.progress,
    }))
  );

  const openDocs = projects.flatMap((project) =>
    project.documents.open.map((doc) => ({
      ...doc,
      project: project.title,
      schema: project.schema,
      status: "Open",
    }))
  );

  const completedDocs = projects.flatMap((project) =>
    project.documents.completed.map((doc) => ({
      ...doc,
      project: project.title,
      schema: project.schema,
      status: "Completed",
    }))
  );

  return (
    <div className="p-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="ongoing">
          <AccordionTrigger className="text-xl font-bold">Ongoing Documents</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {ongoingDocs.map((doc, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                  <p className="font-semibold">Document: {doc.name}</p>
                  <p>Project: {doc.project}</p>
                  <p>Schema: {doc.schema}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="w-24 h-2 bg-green-200 rounded-full">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${doc.progress}%` }}
                      ></div>
                    </div>
                    <Button>Continue Working</Button>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="open">
          <AccordionTrigger className="text-xl font-bold">Open Documents</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {openDocs.map((doc, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                  <p className="font-semibold">Document: {doc.name}</p>
                  <p>Project: {doc.project}</p>
                  <p>Schema: {doc.schema}</p>
                  <Button>Start Working</Button>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="completed">
          <AccordionTrigger className="text-xl font-bold">Completed Documents</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {completedDocs.map((doc, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                  <p className="font-semibold">Document: {doc.name}</p>
                  <p>Project: {doc.project}</p>
                  <p>Schema: {doc.schema}</p>
                  <Button>Open Document</Button>
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

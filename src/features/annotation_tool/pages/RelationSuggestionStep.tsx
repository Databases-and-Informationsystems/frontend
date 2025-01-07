import { useEffect, useState } from "react";
import { useRelationContext } from "../context/useRelationContext"
import { useSelection } from "../hooks/useSelection";
import { Relation as RelationType } from "../types";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSchema } from "../hooks/useSchema";
import { Relation } from "../components/Relation";

export const RelationSuggestionStep = () => {
  const { relations, loading, handleUpdateRelation, handleDeleteRelation } = useRelationContext();
  const { currentStep, setCurrentStep } = useSelection();
  const { schema } = useSchema();
  const [currentRelation, setCurrentRelation] = useState<RelationType | null>(
    relations.find((relation) => relation.isShownRecommendation === true) || null
  );

  const hasSuggestions = relations.some(relation => relation.isShownRecommendation === true);

  useEffect(() => {
    if (!loading && !hasSuggestions) {
      setCurrentStep(currentStep + 1);
    }
  }, [hasSuggestions, setCurrentStep, currentStep, loading]);

  if (loading) {
    return <p>Loading suggestions...</p>;
  }

  const handleAccept = () => {
    if (currentRelation) {
      const updatedRelation = {
        ...currentRelation,
        isShownRecommendation: false,
      }
      handleUpdateRelation(currentRelation.id, updatedRelation);
      nextRelation();
    }
  }

  const handleReject = () => {
    if (currentRelation) {
      handleDeleteRelation(currentRelation.id);
      nextRelation();
    }
  }

  const handleTagChange = (newTag: string) => {
    if (currentRelation) {
      setCurrentRelation((prev) => {
        if (prev) {
          return {
            ...prev,
            tag: newTag,
          }
        }
        return null;
      })
    }
  }

  const nextRelation = () => {
    const nextRelation = relations.find((relation) => relation.isShownRecommendation === true);
    if (nextRelation) {
      setCurrentRelation(nextRelation);
    }
  }

  return (
    <div>
      <Button
          onClick={() =>
            handleAccept()
            }>Accept</Button>
        <Select value={currentRelation?.tag} onValueChange={(value: string) => handleTagChange(value)}>
          <SelectTrigger>
            <SelectValue>{currentRelation?.tag}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Mention Tags</SelectLabel>
              {schema!.relations.map((relationSchema) => {
                return (
                  <SelectItem
                    key={relationSchema.id}
                    value={relationSchema.tag}
                  >
                    {relationSchema.tag}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button onClick={() => handleReject()}>Reject</Button>
        <div>
          <Relation relation={currentRelation!}/>
        </div>
    </div>
  )
}

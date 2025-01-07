import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select'
import { Relation } from './Relation'
import { useSchema } from '../hooks/useSchema'
import { useRelationContext } from '../context/useRelationContext'
import { useEffect, useState } from 'react'

export const RelationSuggestionContainer = () => {
  const { schema } = useSchema()
  const { relations, handleUpdateRelation, handleDeleteRelation } = useRelationContext()
  const [relationTag, setRelationTag] = useState<string | undefined>(undefined)

  const currentRelation = relations.find((relation) => relation.isShownRecommendation === true)

  useEffect(() => {
    if (currentRelation) {
      setRelationTag(currentRelation.tag);
    }
  }, [currentRelation]);

  const handleAccept = () => {
    handleUpdateRelation(
      currentRelation!.id,
      {
        ...currentRelation!,
        isShownRecommendation: false,
        tag: relationTag || currentRelation!.tag
      })
  }

  const handleReject = () => {
    handleDeleteRelation(currentRelation!.id)
  }

  return (
    <>
      <div className="flex gap-4 py-6 w-96">
        <Button
          onClick={() =>
            handleAccept()
          }>Accept</Button>
        <Select value={relationTag} onValueChange={(value: string) => setRelationTag(value)}>
          <SelectTrigger>
            <SelectValue>{relationTag}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Relation Types</SelectLabel>
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
      </div>
      <div>
        <Relation relation={currentRelation!} />
      </div>
    </>
  )
}

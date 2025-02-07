import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select'
import { Relation } from './Relation'
import { useSchemaContext } from '../context/useSchemaContext'
import { useRelationContext } from '../context/useRelationContext'
import { useEffect, useState } from 'react'

export const RelationSuggestionContainer = () => {
  const { schema } = useSchemaContext()
  const { relations, handleAcceptRelation, handleRejectRelation } = useRelationContext()
  const [relationTag, setRelationTag] = useState<string | undefined>(undefined)

  const currentRelation = relations.find((relation) => relation.isShownRecommendation === true)

  useEffect(() => {
    if (currentRelation) {
      setRelationTag(currentRelation.tag);
    }
  }, [currentRelation]);

  const handleAccept = () => {
    handleAcceptRelation(currentRelation!.id)
  }

  const handleReject = () => {
    handleRejectRelation(currentRelation!.id)
  }

  return (
    <>
      <div className="flex gap-4 py-6 w-96">
        <Button
          onClick={() =>
            handleAccept()
          }>Accept</Button>
          {/* We don't allow updates during suggestion step atm */}
        {/* <Select value={relationTag} onValueChange={(value: string) => setRelationTag(value)}>
          <SelectTrigger>
            <SelectValue>{relationTag}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Relation Types</SelectLabel>
              {schema!.schema_relations.map((relationSchema) => {
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
        </Select> */}
        <Button onClick={() => handleReject()}>Reject</Button>
      </div>
      <div>
        <Relation relation={currentRelation!} />
      </div>
    </>
  )
}

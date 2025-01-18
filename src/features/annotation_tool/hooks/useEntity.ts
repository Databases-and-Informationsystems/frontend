import { useEffect, useState } from 'react'
import { AnnotationEntity } from '../types'
import { createEntity, deleteEntity, updateEntity } from '../api/annotationEntityHelper'
import axios from 'axios'
import { updateMention } from '@/features/annotation_tool/api/mention.ts'
import { useMentionContext } from '@/features/annotation_tool/context/useMentionContext.ts'

export const useEntity = () => {
  const [entities, setEntities] = useState<AnnotationEntity[]>([])
  const [loading, setLoading] = useState(false)
  const { mentions } = useMentionContext();

  useEffect(() => {
    const fetchEntities = async () => {
      setLoading(true)
      try {
        const response = await axios.get('http://localhost:3000/entities')
        setEntities(response.data)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    fetchEntities()
  }, [])

  const getEntityById = (id: any) => {
    console.log('Current Entities while searching:', entities)
    const res = entities.find((ent) => ent.id == id)
    console.log(
      `Searching for entity ${id}, type: ${typeof id}, found: ${JSON.stringify(res)}`
    )
    return res // used for getting the mention for the draggable overlay
  }

  const handleCreateEntityViaElements = (eId: any, mIds: number[]) => {
    const newEntity: AnnotationEntity = {
      id: eId,
      mention_ids: mIds
    }
    handleCreateEntity(newEntity);
  }

  const handleCreateEntity = async (newEntity: AnnotationEntity) => {
    const createdEntity = await createEntity(newEntity)
    setEntities((prev) => [...prev, createdEntity])
  }

  // const handleAddToEntity = async (entityId: any, mentionId: any) => {
  //   const entity = getEntityById(entityId)
  //   entity.mention_ids.push(mentionId)
  //   //EntityState is possibly not updated - TOCHECK
  // }

  const handleAddToEntity = (entityId: any, mentionId: any) => {
    setEntities((prevEntities) => {
      return prevEntities.map((ent) => {
        if (ent.id == entityId) {
          const newMentionIds = [...ent.mention_ids, mentionId]

          ent.mention_ids = newMentionIds;

          let mToChange = mentions.find((ment) => ment.id == mentionId);
          mToChange.entity_id = entityId.toString();

          return { ...ent, mention_ids: newMentionIds }
        }
        return ent
      })
    })
  }

  // const handleRemoveFromEntity = async (entityId: any, mentionId: any) => {
  //   const entity = getEntityById(entityId)
  //   console.log("Searched for entity ", entityId)
  //   entity.mention_ids = entity.mention_ids.filter((elem, idx) => elem != mentionId)
  //   console.log(`Removed Mention with id ${mentionId} from Entity ${entityId}`)
  // }

  const handleRemoveFromEntity = (
    entityId: string | number,
    mentionId: string | number
  ) => {
    setEntities((prevEntities) => {
      const newEntities = prevEntities.map((ent) => {
        if (ent.id == entityId) {
          const newMentionIds = ent.mention_ids.filter((m) => m != mentionId)

          let eToChange = getEntityById(entityId);
          eToChange.mention_ids = newMentionIds;

          let mToChange = mentions.find((ment) => ment.id == mentionId);
          mToChange.entity_id = "";

          updateMention(mentionId.toString(), mToChange);
          updateEntity(entityId.toString(), eToChange);
          console.log(
            `Entferne Mention mit ID ${mentionId} aus Entity mit ID ${entityId}.`
          )
          return { ...ent, mention_ids: newMentionIds }
        }
        return ent
      })

      console.log('Updated Entities nach Remove:', newEntities)

      return newEntities
    });
    if (getEntityById(entityId).mention_ids.length === 0) {
      console.log("Entity with id: ", entityId, " now has these mentions: ", JSON.stringify(getEntityById(entityId).mention_ids));
      handleDeleteEntity(entityId);
    }
  }

  const handleDeleteEntity = async (entityId: any) => {
    await deleteEntity(entityId)
    setEntities((prev) => prev.filter((entity) => entity.id !== entityId))
    console.log('Deleted Entity: ', entityId)
  }

  return {
    entities,
    setEntities,
    loading,
    setLoading,
    handleCreateEntity,
    handleCreateEntityViaElements,
    handleAddToEntity,
    handleRemoveFromEntity,
    handleDeleteEntity,
    getEntityById,
  }
}

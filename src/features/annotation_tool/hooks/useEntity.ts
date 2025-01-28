import { useEffect, useState } from 'react'
import { AnnotationEntity } from '../types'
import { createEntity, deleteEntity, updateEntity, fetchEntities as getEntities } from '../api/annotationEntityHelper'
import { updateMention } from '@/features/annotation_tool/api/mention.ts'
import { useMentionContext } from '@/features/annotation_tool/context/useMentionContext.ts'

export const useEntity = () => {
  const [entities, setEntities] = useState<AnnotationEntity[]>([])
  const [loading, setLoading] = useState(false)
  const { mentions } = useMentionContext();

  const doc_edit_id = 1; //TODO get correct value

  useEffect(() => {
    fetchEntities()
  }, [])

  const fetchEntities = async () => {
    setLoading(true)
    try {
      const response = await getEntities(doc_edit_id) //get the Entities for a document
      setEntities(response)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log('Current new Entities:', entities)
  }, [entities])

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
    setEntities((prev) => {
      const entityExists = prev.some((entity) => entity.id == createdEntity.id)
      if (!entityExists) {
        return [...prev, createdEntity]
      }
      return prev
    })
  }

  // const handleAddToEntity = async (entityId: any, mentionId: any) => {
  //   const entity = getEntityById(entityId)
  //   entity.mention_ids.push(mentionId)
  //   //EntityState is possibly not updated - TOCHECK
  // }

  const handleAddToEntity = async (entityId: any, mentionId: any) => {
    setEntities((prevEntities) => {
      return prevEntities.map((ent) => {
        if (ent.id == entityId) {
          const newMentionIds = ent.mention_ids.includes(mentionId)
            ? ent.mention_ids
            : [...ent.mention_ids, mentionId]
          let mToChange = {
            ...mentions.find((ment) => ment.id == mentionId),
            entity_id: entityId.toString(),
          }
          const eChanged = ent;
          eChanged.mention_ids = newMentionIds;
          console.log("Changed Entity: ", JSON.stringify(eChanged));
          updateMention(mentionId.toString(), mToChange)
          updateEntity(entityId.toString(), eChanged)
          console.log('Add Mention ${mentionId} to Entity id ${entityId}')
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

  const handleRemoveFromEntity = async (
    entityId: string | number,
    mentionId: string | number
  ) => {

    const newEntitiyPromises = await entities.map(async (ent) => {
      if (ent.id == entityId) {
        const newMentionIds = ent.mention_ids.filter((m) => m != mentionId)

        let mToChange = mentions.find((ment) => ment.id == mentionId);
        mToChange.entity_id = "";
        ent.mention_ids = newMentionIds;

        await updateMention(mentionId.toString(), mToChange);
        await updateEntity(entityId.toString(), ent);
        console.log(
          `Entferne Mention mit ID ${mentionId} aus Entity mit ID ${entityId}.`
        )
        return ent
      }
      return ent
    });
    const newEntities = await Promise.all(newEntitiyPromises); //Parallel waiting for all promises to arrive

    console.log('Updated Entities nach Remove:', newEntities)

    const currEntity = getEntityById(entityId);
    if (currEntity.mention_ids.length === 0) {
      console.log("Entity with id: ", entityId, " now has these mentions: ", JSON.stringify(currEntity.mention_ids));
      handleDeleteEntity(entityId);
    }else {
      setEntities(newEntities);
    }
  }

  const handleDeleteEntity = async (entityId: any) => {
    setEntities((prev) => prev.filter((entity) => entity.id !== entityId))
    await deleteEntity(entityId)
    await fetchEntities()
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

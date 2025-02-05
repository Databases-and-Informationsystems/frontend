import { useEffect, useState } from 'react'
import { AnnotationEntity, Mention, UpdateMentionPayload } from '../types'
import {
  createEntity,
  deleteEntity, EntityCreationPayload,
  fetchEntities as getEntities,
} from '../api/annotationEntityHelper'
import { updateMention } from '@/features/annotation_tool/api/mention.ts'
import { useMentionContext } from '@/features/annotation_tool/context/useMentionContext.ts'
import { useParams } from 'react-router-dom'

export const useEntity = () => {
  const [entities, setEntities] = useState<AnnotationEntity[]>([])
  const [loading, setLoading] = useState(false)
  const { mentions } = useMentionContext()

  const {id:doc_id} = useParams()
  const doc_edit_id = Number(doc_id)

  useEffect(() => {
    fetchEntities()
  }, [])

  const fetchEntities = async () => {
    setLoading(true)
    try {
      const response = await getEntities(doc_edit_id) //get the Entities for a document
      setEntities(response.entities)
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
      mention_ids: mIds,
    }
    handleCreateEntity(newEntity)
  }

  const handleCreateEntity = async (newEntity: EntityCreationPayload) => {
    const createdEntity = await createEntity(newEntity)
    setEntities((prev) => {
      const entityExists = prev.some((entity) => entity.id == createdEntity.id)
      if (!entityExists) {
        return [...prev, createdEntity]
      }
      return prev
    });
  }

  const getTokenIds = (mentionId: number) => {
    const mention = mentions.find((ment) => ment.id == mentionId);
    if (mention) {
      return mention.tokens.map((token) => token.id);
    }
    return [];
  };

  const handleAddToEntity = async (entityId: any, mentionId: any) => {
    setEntities((prevEntities) => {
      return prevEntities.map((ent) => {
        if (ent.id == entityId) {
          const mToChange: Mention = {
            ...mentions.find((ment) => ment.id == mentionId),
            entity_id: entityId,
          }
          const eChanged = ent
          eChanged.mentions = [...ent.mentions, mToChange]
          console.log('Changed Entity: ', JSON.stringify(eChanged))
          const mPayload: UpdateMentionPayload = {
            token_ids: getTokenIds(mentionId),
            schmea_mention_id: mToChange.schema_mention.id,
            entity_id: entityId
          }
          updateMention(mentionId, mPayload)
          //updateEntity(entityId.toString(), eChanged)
          console.log('Add Mention ',mentionId.toString(),' to Entity id ',entityId.toString())
          return { ...ent, mentions: eChanged.mentions }
        }
        return ent
      })
    })
  }

  const handleRemoveButton = (
    entityId: number,
    mentionId: number
  ) => {
    const ent = getEntityById(entityId)
    if (ent.mentions.length < 2) {
      console.log("%cNo action", "color: lime")
      return
    }else {
      handleRemoveFromEntity(entityId, mentionId)
    }
  }

  const handleRemoveFromEntity = async (
    entityId: number,
    mentionId: number,
    noNewEntity?: boolean
  ) => {
    const newEntitiyPromises = await entities.map(async (ent) => {
      if (ent.id == entityId) {
        console.log(`%cent mentions: ${ent.mentions.length}, noNewEntity: ${noNewEntity} type ${typeof noNewEntity}`, 'color: lime')

        let mToChange = mentions.find((ment) => ment.id == mentionId)
        mToChange.entity_id = null
        const eChanged = {
          ...ent,
          mentions: ent.mentions.filter((mention) => mention.id !== mentionId)
        }

        if(noNewEntity === "undefined" || noNewEntity === undefined) {
          noNewEntity = false
        }

        const mPayload: UpdateMentionPayload = {
          token_ids: getTokenIds(mentionId),
          schmea_mention_id: mToChange.schema_mention.id,
          entity_id: 0
        }
        const ePayload: EntityCreationPayload = {
          document_edit_id: doc_edit_id,
          mention_ids: [mentionId],
        }
        console.log("Vor mention update")
        await updateMention(mentionId, mPayload).then(() => {if(!noNewEntity) {handleCreateEntity(ePayload)}});
        //await updateEntity(entityId.toString(), ent); not needed anymore due to backend
        console.log(`%cEntferne Mention mit ID ${mentionId} aus Entity mit ID ${entityId}.`,'color: purple')
        console.log('%cAktuell sind ','color: aquamarine',ent.mentions.length.toString(),' Mentions in ent und ',eChanged.mentions.length.toString(),' Mentions in eChanged')
        /*if (ent.mentions.length === 1 || eChanged.mentions.length === 0) {
          console.log("%cIn delete if","color: red")
          await handleDeleteEntity(entityId)
        }*/
        return eChanged
      }
      return ent
    })
    const newEntities = await Promise.all(newEntitiyPromises) //Parallel waiting for all promises to arrive

    console.log('Updated Entities nach Remove:', newEntities)

    const currEntity = getEntityById(entityId)
    console.log("%ccurrEntity has ","color: blue",currEntity.mentions.length.toString(),"mentions")
    if (currEntity.mentions.length === 1) {
      console.log(
        'Entity with id: ',
        entityId,
        ' now has these mentions: ',
        JSON.stringify(currEntity.mentions)
      )
      handleDeleteEntity(entityId)
    } else {
      setEntities(newEntities)
    }
  }

  const handleDeleteEntity = async (entityId: number) => {
    console.log("%cDelete 1 reached!", "color: red")
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
    handleRemoveButton,
    handleDeleteEntity,
    getEntityById,
  }
}

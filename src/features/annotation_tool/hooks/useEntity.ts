import { useEffect, useState } from 'react'
import { AnnotationEntity } from '../types'
import { createEntity, deleteEntity, updateEntity } from '../api/annotationEntityHelper';

export const useEntity = () => {
  const [entities, setEntities] = useState<AnnotationEntity[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Current Entities:', entities);
  }, [entities]);

  const getEntityById = (id: any) => {
    console.log('Current Entities:', entities);
    const res = entities.find((ent) => ent.id == id);
    console.log(`Searching for entity ${id}, type: ${typeof id}, found: ${JSON.stringify(res)}`);
    return res // used for getting the mention for the draggable overlay
  };

  const handleCreateEntity = async (newEntity: AnnotaionEntity) => {
    const createdEntity = await createEntity(newEntity);
    setEntities((prev) => [...prev, createdEntity]);
  };

  const handleAddToEntity = async (entityId: any, mentionId: any) => {
    const entity = getEntityById(entityId)
    entity.mention_ids.push(mentionId)
    //EntityState is possibly not updated - TOCHECK
  }

  const handleRemoveFromEntity = async (entityId: any, mentionId: any) => {
    const entity = getEntityById(entityId)
    console.log("Searched for entity ", entityId)
    entity.mention_ids = entity.mention_ids.filter((elem, idx) => elem == mentionId)
    console.log(`Removed Mention with id ${mentionId} from Entity ${entityId}`)
  }

  const handleDeleteEntity = async (entityId: any) => {
    await deleteEntity(entityId)
    setEntities((prev) => prev.filter(entity => entity.id !== entityId));
    console.log('Deleted Entity: ', entityId);
  }


  return {
    entities,
    setEntities,
    loading,
    setLoading,
    handleCreateEntity,
    handleAddToEntity,
    handleRemoveFromEntity,
    handleDeleteEntity,
  }
}

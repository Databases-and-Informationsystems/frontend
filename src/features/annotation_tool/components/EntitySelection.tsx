import { MultipleDroppables } from '@/features/annotation_tool/components/DroppableHandler.tsx'
import { DraggableHand } from '@/features/annotation_tool/components/DraggableHandler.tsx'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { useState } from 'react'
import { useMentionContext } from '../context/useMentionContext'
import { Mention } from '@/features/annotation_tool/components/Mention.tsx'
import { useEntity } from '@/features/annotation_tool/hooks/useEntity.ts'
import { Card } from '@/components/ui/card.tsx'


const EntitySelection = () => {

  const { loading: eLoading, entities, getEntityById, handleAddToEntity, handleRemoveFromEntity, handleRemoveButton } = useEntity();
  const { mentions, loading } = useMentionContext();

  console.log("%c Before mapping: ", "color: orange", entities);
  const entityIds = Array.isArray(entities) ? entities?.map((entity) => entity.id) : [];

  const getMentionById = (id) => {
    //console.log("Searching for id: " + id);
    return mentions.find((ment) => ment.id == id); // used for getting the mention for the draggable overlay
  };

  //Droppable / Draggable handling
  const [activeId, setActiveId] = useState(null)
  const [droppableItemLists, setDroppableItemLists] = useState<
    Record<string, Element[]>
  >({
    dr1: [],
  })

  const getEntityByMentionId = (mId: number) => (
    entities.find(ent => ent.mentions.some(mention => mention.id === mId)));

  function handleDragStart(event) {
    setActiveId(event.active.id)
  }

  /**
   * Handle moving Mentions into other Entities
   * @param event
   */
  function handleDragEnd(event) {
    const { active, over } = event
    if (over) {
      console.log(`Dropped ${active.id} in ${over.id}`)
      let tempM = getMentionById(active.id);
      let tempE = getEntityById(over.id);
      console.log(`Has tag ${tempM.tag}`);
      const entry = tempE.mentions[0].id;
      const typeMInE = getMentionById(entry).tag;
      const fromEntity = getEntityByMentionId(active.id).id;
      if (typeMInE === tempM.tag && fromEntity != over.id) {
        console.log("Can be inserted");
        handleRemoveFromEntity(fromEntity, active.id, true);
        handleAddToEntity(over.id, active.id);
      } else {
        console.log("Can't be inserted");
      }
    }
    setActiveId(null)
  }

  if (loading) {
    return (<p>Loading Mentions...</p>)
  }

  if (eLoading) {
    return (<p>Loading Entities...</p>)
  }

  /**
   * Enables or disables a dev-mode to check the boundaries of some elements
   */
  const dev_mode = false;
  let css_left = "overflow-auto";
  let css_right = "overflow-auto m-1"

  if (dev_mode) {
    css_left = "bg-blue-300 overflow-auto text-black";
    css_right = "bg-lime-300 overflow-auto text-black"
  }

  //HTML
  return (
    <Card
      className="grid grid-cols-2 overflow-auto min-h-32 p-1"
      style={{height: '70vh' }}
    >
      <div className={css_left}>
        {/*<p>Current Entity array: {JSON.stringify(entities)}</p>*/}
        {/*<p>Current eIds array: {JSON.stringify(entityIds)}</p>*/}
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <MultipleDroppables
            onMentionRemoved={handleRemoveButton}
            eIds={entityIds}
            items={droppableItemLists}
            allEntities={entities}
            allTokens={mentions}
            dev_mode={dev_mode}
          ></MultipleDroppables>
          <DragOverlay>
            {' '}
            {activeId ? <DraggableHand m={getMentionById(activeId)} id={activeId} /> : null}{' '}
          </DragOverlay>
        </DndContext>
      </div>
      <div className={css_right}>
        {
          mentions.map((mention) => (<Mention key={mention.id} mention={mention} showDeleteButton={false} ></Mention>))
        }
      </div>
    </Card>
  )
}

export default EntitySelection

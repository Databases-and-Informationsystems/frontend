import { MultipleDroppables } from '@/features/annotation_tool/components/DroppableHandler.tsx'
import { DraggableHand } from '@/features/annotation_tool/components/DraggableHandler.tsx'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { useState, useMemo } from 'react'
import { useMentionContext } from '../context/useMentionContext'
import { Mention } from '@/features/annotation_tool/components/Mention.tsx'
import { useEntity } from '@/features/annotation_tool/hooks/useEntity.ts'
import { Mention as MentionType } from '@/features/annotation_tool/types'


const EntitySelection = () => {

  const { loading: eLoading, entities, getEntityById, handleAddToEntity, handleRemoveFromEntity } = useEntity();
  const { mentions, loading } = useMentionContext();
  const entityIds = useMemo(
    () => entities?.map((entity) => entity.id) || [],
    [entities]
  );

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

  const getEntityByMentionId = (mId: string) => (
    entities.find(ent => ent.mention_ids.includes(mId)));

  function handleDragStart(event) {
    setActiveId(event.active.id)
  }

  function handleDragEnd(event) {
    const { active, over } = event
    if (over) {
      console.log(`Dropped ${active.id} in ${over.id}`)
      let tempM = getMentionById(active.id);
      let tempE = getEntityById(over.id);
      console.log(`Has tag ${tempM.tag}`);
      const entry = tempE.mention_ids[0];
      const typeMInE = getMentionById(entry).tag;
      const fromEntity = getEntityByMentionId(active.id).id;
      if (typeMInE === tempM.tag && fromEntity != over.id) {
        console.log("Can be inserted");
        handleAddToEntity(over.id, active.id);
        handleRemoveFromEntity(fromEntity, active.id);
      }else {
        console.log("Can't be inserted");
      }
    }
    setActiveId(null)
  }

  if (eLoading || loading) {
    return (<p>Loading Entities...</p>)
  }

  const dev_mode = false;
  let css_left = "overflow-auto text-black";
  let css_right = "overflow-auto text-black"

  if (dev_mode) {
    css_left = "bg-blue-300 overflow-auto text-black";
    css_right = "bg-lime-300 overflow-auto text-black"
  }

  //HTML
  return (
    <div
      className="grid grid-cols-2 overflow-auto min-h-32 border-amber-500"
      style={{ border: 'solid', height: '95vh' }}
    >
      <div className={css_left}>
        <p className={"text-orange-600"}>/* TODO: left scroll */</p>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          {/*<TokenProvider>*/}
          <MultipleDroppables
            names={entityIds}
            items={droppableItemLists}
            allEntities={entities}
            allTokens={mentions}
            dev_mode={dev_mode}
          ></MultipleDroppables>
          {/*}</TokenProvider>*/}
          {/*<DraggableHand id={1}></DraggableHand>
          <DraggableHand id={2}></DraggableHand>*/}
          <DragOverlay>
            {' '}
            {activeId ? <DraggableHand m={getMentionById(activeId)} id={activeId} /> : null}{' '}
          </DragOverlay>
        </DndContext>
      </div>
      <div className={css_right}>
        <p className={"text-orange-600"}>/* TODO: text / mention view */</p>
          {/*<MentionProvider>*/}
        {
          mentions.map((mention) => (<Mention key={mention.id} mention={mention} showDeleteButton={false} ></Mention>))
        }
        {/*</MentionProvider>*/}
      </div>
    </div>
  )
}

export default EntitySelection

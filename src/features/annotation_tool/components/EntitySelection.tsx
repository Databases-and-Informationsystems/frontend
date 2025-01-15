import { MultipleDroppables } from '@/features/annotation_tool/components/DroppableHandler.tsx'
import { DraggableHand } from '@/features/annotation_tool/components/DraggableHandler.tsx'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { useState, useMemo } from 'react'
import { useMentionContext } from '../context/useMentionContext'
import { Mention } from '@/features/annotation_tool/components/Mention.tsx'
import { useEntity } from '@/features/annotation_tool/hooks/useEntity.ts'


const EntitySelection = () => {

  const { loading: eLoading, entities } = useEntity();
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

  function handleDragStart(event) {
    setActiveId(event.active.id)
  }

  function handleDragEnd(event) {
    const { active, over } = event
    if (over) {
      console.log(`Dropped ${active.id} in ${over.id}`)
    }
    setActiveId(null)
  }

  if (eLoading || loading) {
    return (<p>Loading Entities...</p>)
  }

  //HTML
  return (
    <div
      className="grid grid-cols-2 overflow-auto min-h-32 border-amber-500"
      style={{ border: 'solid', height: '95vh' }}
    >
      <div className="bg-blue-300 overflow-auto text-black">
        /* TODO: left scroll */
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          {/*<TokenProvider>*/}
          <MultipleDroppables
            names={entityIds}
            items={droppableItemLists}
            allEntities={entities}
            allTokens={mentions}
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
      <div className="bg-lime-300 overflow-auto text-black">
        /* TODO: text / mention view */
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

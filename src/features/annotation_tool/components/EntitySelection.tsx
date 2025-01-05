import { MultipleDroppables } from '@/features/annotation_tool/components/DroppableHandler.tsx'
import { DraggableHand } from '@/features/annotation_tool/components/DraggableHandler.tsx'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { useEffect, useState, SyntheticEvent, useMemo } from 'react'
import { Mention } from '@/features/annotation_tool/types'
import { AnnotationEntity } from '@/features/annotation_tool/types/entity.ts'
import axios from 'axios'
import { useMentionContext } from '../context/useMentionContext'
import { useTokens } from '../hooks/useTokens'


function EntitySelection() {

  const [entityData, setEntityData] = useState<any>()
  const { mentions } = useMentionContext();
  const { tokens} = useTokens();
  const entityIds = useMemo(
    () => entityData?.map((entity) => entity.id) || [],
    [entityData]
  );

  useEffect(() => {
    const entity = async () => {
      try {
        const response = await axios.get('http://localhost:3033/entities')
          .then((response) => setEntityData(response.data));
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        console.log("finallyEntities");
      }
    }
    entity()
  }, [])

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

  //HTML
  return (
    <div
      className="grid grid-cols-2 overflow-auto min-h-32 border-amber-500"
      style={{ border: 'solid', height: '95vh' }}
    >
      <div className="bg-blue-300 overflow-auto text-black">
        /* TODO: left scroll */
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <MultipleDroppables
            names={entityIds}
            items={droppableItemLists}
            allEntities={entityData}
            allTokens={tokenData}
          ></MultipleDroppables>
          {/*<DraggableHand id={1}></DraggableHand>
          <DraggableHand id={2}></DraggableHand>*/}
          <DragOverlay>
            {' '}
            {activeId ? <DraggableHand id={activeId} /> : null}{' '}
          </DragOverlay>
        </DndContext>
      </div>
      <div className="bg-lime-300 overflow-auto text-black">
        /* TODO: text / mention view */
      </div>
    </div>
  )
}

export default EntitySelection

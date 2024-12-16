import { MultipleDroppables } from '@/features/annotation_tool/components/DroppableHandler.tsx'
import { DraggableHand } from '@/features/annotation_tool/components/DraggableHandler.tsx'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { useEffect, useState, SyntheticEvent } from 'react'
import { Mention } from '@/features/annotation_tool/types'
import { AnnotationEntity } from '@/features/annotation_tool/types/entity.ts'
import axios from 'axios'


function EntitySelection() {

  const [entityIds, setEntityIds] = useState<any>([])
  const [entityData, setEntityData] = useState<any>()
  const [mentionData, setMentionData] = useState<any>()

  useEffect(() => {
    const mentions = async () => {
      try {
        const response = await axios.get('http://localhost:3033/mentions');
        const resData = response.data;
        console.log("ResData: ", resData);
        setMentionData(resData);
        console.log("Mention response: ", response.data);
        console.log("Mention state1: ", mentionData);
        setMentionData(response.data);
        console.log("Mention state2: ", mentionData);
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        console.log("finallyMentions");
      }
    }
    mentions()
  }, [])

  useEffect(() => {
    const entity = async () => {
      try {
        const response = await axios.get('http://localhost:3033/entities');
        console.log("Entity stuff: ", response.data);
        setEntityData(response.data);
        console.log("Entity state: ", entityData);
        setEntityIds(response.data.map((entity) => entity.id))
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
          ></MultipleDroppables>
          <DraggableHand id={'Eins'}></DraggableHand>
          <DraggableHand id={'Zwei'}></DraggableHand>
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

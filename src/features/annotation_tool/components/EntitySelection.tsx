import { MultipleDroppables } from '@/features/annotation_tool/components/DroppableHandler.tsx'
import { DraggableHand } from '@/features/annotation_tool/components/DraggableHandler.tsx'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { useEffect, useState, SyntheticEvent } from 'react'
import { Mention } from '@/features/annotation_tool/types'
import { AnnotationEntity } from '@/features/annotation_tool/types/entity.ts'

function EntitySelection() {

  interface JsonData { mentions: Mention[]; entities: AnnotationEntity[]; }

  const [jsonData, setJsonData] = useState<JsonData | null>(null);

  const json = fetch("src/features/annotation_tool/components/jsonTestRenamed.json")
    .then(response => response.json())
    .then(data => setJsonData(data))
    .catch(error => console.error('Error loading JSON:', error));

  const [activeId, setActiveId] = useState(null);
  const [droppableItemLists, setDroppableItemLists] = useState<Record<string, Element[]>>({
    dr1: []
  });
  function handleDragStart(event) { setActiveId(event.active.id); }
  function handleDragEnd(event) { const { active, over } = event; if (over) { console.log(`Dropped ${active.id} in ${over.id}`); } setActiveId(null);}

    return (
    <div className="grid grid-cols-2 overflow-auto min-h-32 border-amber-500" style={{border: 'solid', height: '95vh'}}>
      <div className="bg-blue-300 overflow-auto text-black">
        /* TODO: left scroll */
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <MultipleDroppables names={["1", "2", "entity 3"]} items={droppableItemLists}></MultipleDroppables>
          <DraggableHand id={"Eins"}></DraggableHand>
          <DraggableHand id={"Zwei"}></DraggableHand>
          <DragOverlay> {activeId ? <DraggableHand id={activeId} /> : null} </DragOverlay>
        </DndContext>
      </div>
      <div className="bg-lime-300 overflow-auto text-black">
        /* TODO: text / mention view */
      </div>
    </div>
  );
}

export default EntitySelection
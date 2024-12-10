import { MultipleDroppables } from '@/features/annotation_tool/components/DroppableHandler.tsx'
import { DraggableHand } from '@/features/annotation_tool/components/DraggableHandler.tsx'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { useState } from 'react'

function EntitySelection() {

  const [activeId, setActiveId] = useState(null);
  function handleDragStart(event) { setActiveId(event.active.id); }
  function handleDragEnd(event) { const { active, over } = event; if (over) { console.log(`Dropped ${active.id} in ${over.id}`); } setActiveId(null);}

    return (
    <div className="grid grid-cols-2 overflow-auto min-h-32 border-amber-500" style={{border: 'solid', height: '95vh'}}>
      <div className="bg-blue-300 overflow-auto text-black">
        /* TODO: left scroll */
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <MultipleDroppables names={["1", "2", "entity 3"]}></MultipleDroppables>
          <DraggableHand></DraggableHand>
          <DragOverlay> {activeId ? <DraggableHand /> : null} </DragOverlay>
        </DndContext>
      </div>
      <div className="bg-lime-300 overflow-auto text-black">
        /* TODO: text / mention view */
      </div>
    </div>
  );
}

export default EntitySelection
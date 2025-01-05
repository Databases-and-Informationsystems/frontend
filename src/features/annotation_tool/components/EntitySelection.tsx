import { MultipleDroppables } from '@/features/annotation_tool/components/DroppableHandler.tsx'
import { DraggableHand } from '@/features/annotation_tool/components/DraggableHandler.tsx'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { useEffect, useState, SyntheticEvent, useMemo } from 'react'
import { Mention } from '@/features/annotation_tool/types'
import { AnnotationEntity } from '@/features/annotation_tool/types/entity.ts'
import axios from 'axios'
import { useMentionContext } from '../context/useMentionContext'
import { useTokens } from '../hooks/useTokens'
import { TokenProvider } from '@/features/annotation_tool/provider/TokenProvider.tsx'
import { MentionProvider } from '@/features/annotation_tool/provider/MentionProvider.tsx'
import { useMentions } from '@/features/annotation_tool/hooks/useMention.ts'


function EntitySelection() {

  const [entityData, setEntityData] = useState<any>()
  const { mentions, loading, handleCreateMention, handleDeleteMention, handleUpdateMention } = useMentionContext();
  //const { tokens } = useTokens();
  const entityIds = useMemo(
    () => entityData?.map((entity) => entity.id) || [],
    [entityData]
  );

  useEffect(() => {
    const entity = async () => {
      try {
        const response = await axios.get('http://localhost:3000/entities')
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
          <TokenProvider>
            <MultipleDroppables
              names={entityIds}
              items={droppableItemLists}
              allEntities={entityData}
              allTokens={mentions}
            ></MultipleDroppables>
          </TokenProvider>
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
        <MentionProvider>
          {
            mentions.map((mention) => (<p>{mention.tag}</p>))
          }
        </MentionProvider>
      </div>
    </div>
  )
}

export default EntitySelection

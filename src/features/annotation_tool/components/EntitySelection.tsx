import { MultipleDroppables } from '@/features/annotation_tool/components/DroppableHandler.tsx'
import { DraggableHand } from '@/features/annotation_tool/components/DraggableHandler.tsx'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { useState, useMemo, useRef, useEffect } from 'react'
import { useMentionContext } from '../context/useMentionContext'
import { Mention } from '@/features/annotation_tool/components/Mention.tsx'
import { useEntity } from '@/features/annotation_tool/hooks/useEntity.ts'
import { Mention as MentionType } from '@/features/annotation_tool/types'


const EntitySelection = () => {

  const hasRun = useRef(false);
  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current++;
    if (!hasRun.current) {
      hasRun.current = true;
    }
    hasRun.current = !hasRun.current;
  })

  const { loading: eLoading, entities, getEntityById, handleAddToEntity, handleRemoveFromEntity, handleCreateEntityViaElements, handleDeleteEntity } = useEntity();
  const { mentions, loading, handleUpdateMention } = useMentionContext();
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
      const entry = tempE.mention_ids[0];
      const typeMInE = getMentionById(entry).tag;
      const fromEntity = getEntityByMentionId(active.id).id;
      if (typeMInE === tempM.tag && fromEntity != over.id) {
        console.log("Can be inserted");
        handleRemoveFromEntity(fromEntity, active.id);
        while (eLoading) {}
        handleAddToEntity(over.id, active.id);
      }else {
        console.log("Can't be inserted");
      }
    }
    setActiveId(null)
  }

  if (loading) {
    return (<p>Loading Mentions...</p>)
  }

  entities.map((entity) => {
    if(entity.mention_ids.length === 0) {
      handleDeleteEntity(entity.id.toString());
    }
  })

  /**
   * Create Entities for single Mentions
   * TODO: This code generates duplicated Entities after a single Mention is deleted and before it gets reimported (but twice)
   */
  let m_not_in_entity = mentions.find((mention) => mention.entity_id === '');
  let max_eId = Math.max(...entityIds);
  console.log(`Max eId: ${max_eId}`);
  console.log(`Mentions not in an entity: `, JSON.stringify(m_not_in_entity), " type: ", typeof m_not_in_entity);
  console.log("%c Run: ", "color: aquamarine", renderCount.current)
  if (m_not_in_entity !== undefined && hasRun && renderCount.current === 4) { //remove && false to enable bug and adding single Mentions into new Entities
    console.log("%c Has run", "color: #49ef23")
    console.log("Render count: ", renderCount)
    console.log("%c Nicht undefined!", "color: orange");
    if (Array.isArray(m_not_in_entity)) {
      m_not_in_entity.map((mention) => {
        if (getEntityByMentionId(mention.id.toString()) === undefined) {
          const ids: number[] = [];
          ids.push(mention.id);
          mention.entity_id = ++max_eId;
          //handleUpdateMention(mention.id.toString(), mention)
          //while(loading){} //prevents double creation!!
          //handleCreateEntityViaElements(max_eId, ids);
        }
      })
    }else {
      if (getEntityByMentionId(m_not_in_entity.id.toString()) === undefined) {
        console.log("%c Nicht undefined! Single one to be added", "color: #f7e545");
        const ids: number[] = [];
        ids.push(Number(m_not_in_entity.id));
        m_not_in_entity.entity_id = ++max_eId;
        if(getEntityByMentionId(m_not_in_entity.id.toString()) === undefined) {
          console.log("%c Noch nicht hinzugefügt", "color: #456ef7");
          handleUpdateMention(m_not_in_entity.id.toString(), m_not_in_entity)
          while (loading) {
          } //prevents double creation!!
          handleCreateEntityViaElements(max_eId, ids);
        }
      }
    }
  }

  m_not_in_entity = undefined;

  if (eLoading) {
    return (<p>Loading Entities...</p>)
  }

  /**
   * Enables or disables a dev-mode to check the boundaries of some elements
   */
  const dev_mode = true;
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
            eIds={entityIds}
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

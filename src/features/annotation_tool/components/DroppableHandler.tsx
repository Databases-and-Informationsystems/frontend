import { useDroppable } from '@dnd-kit/core'
import { DraggableHand } from '@/features/annotation_tool/components/DraggableHandler.tsx'
import { useMentionContext } from '@/features/annotation_tool/context/useMentionContext.ts'
import { Card } from '@/components/ui/card.tsx'

function Droppable(props) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  })

  return <div ref={setNodeRef}>{props.children}</div>
}

// function getTokenTypeObject(tokenObj): TokenType {
//   return { id: tokenObj.id, text: tokenObj.text, index_in_document: tokenObj.index_in_document, pos_tag: tokenObj.pos_tag, bio_tag: tokenObj.bio_tag, sentence_index: tokenObj.sentence_index };
// }

interface MultipleDroppablesProps {
  eIds: number[]
  items: Record<string, { id: string }[]>
  allEntities: Record<number, any>
  allTokens: Record<number, any>
  dev_mode: boolean
  onMentionRemoved: (eid: number | string, mid: number | string) => void
}

export function MultipleDroppables({ eIds, items, allEntities, onMentionRemoved, allTokens, dev_mode }: MultipleDroppablesProps) {
  const { mentions, loading, handleCreateMention, handleDeleteMention, handleUpdateMention } = useMentionContext();

  const getMentionById = (id) => {
    //console.log("Searching for id: " + id);
    return mentions.find((ment) => ment.id == id); // Search for the mention
  };

  //get all mention ids for the current entity id
  const getMentionIdsById = (id) => {
    const entity = allEntities.find((item) => item.id == id);
    //console.log('%cgetMentionIdsById found: ',"color: #921e96", JSON.stringify(entity), "for id", id);
    if (entity && entity.mentions) {
      return entity.mentions.map((mention) => mention.id);
    }
    return [];
  };

  let css_border = "border-2 border-solid border-gray-400 mb-1 min-h-20 flex flexEins"
  let css_bg = "m-1"

  if (dev_mode) {
    css_border = "border-2 border-solid border-emerald-400 mb-1 min-h-20 flex flexEins";
    css_bg = "bg-red-300 m-1"
  }

  return (
    <section className={css_bg}>
      {eIds.map((id) => (
        <Card key={id} className={css_border}>
          <Droppable id={id} key={id}>
            {/*Droppable container id: {id}*/}
            {/*items[id].map((item) => ( <div key={item.id}>{item.id}</div> ))*/}
            {getMentionIdsById(id).map((i) => (
              <DraggableHand
                key={i}
                eid={id}
                id={i}
                onMentionRemoved={onMentionRemoved}
                m={getMentionById(i)}
                dev_mode={dev_mode}
                allEntities={allEntities}
              ></DraggableHand>
            ))}{' '}
            {/*loads the corresponding mentions*/}
            {/*<Token token={t}></Token>*/}
            {/*<Mention mention={{id: 1, tag: "testing", isShownRecommendation: true, token_ids: [1]}} tokens={[t]}></Mention>*/}
          </Droppable>
        </Card>
      ))}
      {/*mentions.length > 0 &&
        (Array.isArray(m_not_in_entity) ? m_not_in_entity : [m_not_in_entity]).map((mention) => (
          <div key={++max_eId} className={css_border}>
            <Droppable id={++max_eId} key={++max_eId}>
              Droppable container id: {max_eId}
              <DraggableHand
                key={mention.id}
                eid={max_eId}
                id={mention.id}
                m={mention}
                dev_mode={dev_mode}
                allEntities={allEntities}
              />
            </Droppable>
          </div>
        ))*/
      }
      <style>
        {`
        .flexEins div {
        flex: 1;}`}
      </style>
    </section>
  )
}

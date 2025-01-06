import { useDroppable } from '@dnd-kit/core'
import { Token as TokenType } from '@/features/annotation_tool/types'
import { Token } from '@/features/annotation_tool/components/Token.tsx'
import { Component } from 'react'
import { Mention } from '@/features/annotation_tool/components/Mention.tsx'
import { DraggableHand } from '@/features/annotation_tool/components/DraggableHandler.tsx'
import { useMentionContext } from '@/features/annotation_tool/context/useMentionContext.ts'

function Droppable(props) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  })

  return <div ref={setNodeRef}>{props.children}</div>
}

function getTokenTypeObject (tokenObj): TokenType {
  return { id: tokenObj.id, text: tokenObj.text, index_in_document: tokenObj.index_in_document, pos_tag: tokenObj.pos_tag, bio_tag: tokenObj.bio_tag, sentence_index: tokenObj.sentence_index };
}

interface MultipleDroppablesProps {
  names: number[]
  items: Record<string, {id: string}[]>
  allEntities: Record<number, any>
  allTokens: Record<number, any>
}

export function MultipleDroppables({ names, items, allEntities, allTokens }: MultipleDroppablesProps) {
  const { mentions, loading, handleCreateMention, handleDeleteMention, handleUpdateMention } = useMentionContext();

  const getMentionById = (id) => {
    //console.log("Searching for id: " + id);
    return mentions.find((ment) => ment.id == id); // Search for the mention
  };

  //get all mention ids for the current entity id
  const getMentionIdsById = (id) => {
    const entity = allEntities.find((item) => item.id === id);
    return entity ? entity.mention_ids : [];
  };

  return (
    <section className="bg-red-300 m-1">
      {names.map((id) => (
        <div
          key={id}
          className="border-2 border-solid border-emerald-400 mb-1 min-h-20 flex flexEins"
        >
          <Droppable id={id} key={id}>
            Droppable container id: {id}
            {/*items[id].map((item) => ( <div key={item.id}>{item.id}</div> ))*/}
            {getMentionIdsById(id).map((i) => ( <DraggableHand key={i} id={i} m={getMentionById(i)} allEntities={allEntities}></DraggableHand> ))} {/*loads the corresponding mentions*/}
            {/*<Token token={t}></Token>*/}
            {/*<Mention mention={{id: 1, tag: "testing", isShownRecommendation: true, token_ids: [1]}} tokens={[t]}></Mention>*/}
          </Droppable>
        </div>
      ))}
      <style>
        {`
        .flexEins div {
        flex: 1;}`}
      </style>
    </section>
  )
}

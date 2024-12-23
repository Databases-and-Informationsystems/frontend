import { useDroppable } from '@dnd-kit/core'

function Droppable(props) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  })

  return <div ref={setNodeRef}>{props.children}</div>
}

interface MultipleDroppablesProps {
  names: number[]
  items: Record<string, {id: string}[]>
  all: Record<number, any>
}

export function MultipleDroppables({ names, items, all }: MultipleDroppablesProps) {
  //get all mention ids for the current entity id
  const getMentionIdsById = (id) => {
    const entity = all.find((item) => item.id === id);
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
            {getMentionIdsById(id).map((i) => ( <p key={i}>Innen {i}</p> ))}
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

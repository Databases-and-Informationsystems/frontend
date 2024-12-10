import { useDroppable } from '@dnd-kit/core'

function Droppable(props) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  })

  return <div ref={setNodeRef}>{props.children}</div>
}

interface MultipleDroppablesProps {
  names: string[]
  items: Record<string, {id: string}[]>
}

export function MultipleDroppables({ names, items }: MultipleDroppablesProps) {
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

import { useDraggable } from '@dnd-kit/core';
import { Button } from '@/components/ui/button.tsx'
import { Mention } from '@/features/annotation_tool/components/Mention.tsx'
import { Mention as MentionType } from '../types/mention'
import { useEntity } from '@/features/annotation_tool/hooks/useEntity.ts'

interface props {
  id: number
  eid: number
  allEntities: Record<number, any>
  m: MentionType
  dev_mode: boolean
}

export function DraggableHand({ id, eid, allEntities, m, dev_mode }: props) {

  const { handleRemoveFromEntity } = useEntity()

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id,
  });

  let css_outer = "flex ml-1 mr-1 mt-1 mb-1";

  if (dev_mode) {
    css_outer = "border-solid border-2 border-orange-600 flex ml-1 mr-1 mt-1 mb-1";
  }

  return (
    <div ref={setNodeRef} className={css_outer}>
      {/*Mention id: {id}
      m: {JSON.stringify(m)}*/}
      {/*<TokenProvider>
        <SelectionProvider>
          <Mention key={id} mention={m}></Mention>
        </SelectionProvider>
      </TokenProvider>*/}
      <Mention key={id} mention={m}></Mention>
      <div {...listeners} {...attributes} className="ml-2 bg-gray-300 p-0.5 mt-1 mb-1 rounded-md">Drag handle</div>
      <Button onClick={() => handleRemoveFromEntity(eid, id)}>remove</Button>
    </div>
  );
}
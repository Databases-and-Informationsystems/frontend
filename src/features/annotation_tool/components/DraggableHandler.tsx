import {useDraggable} from '@dnd-kit/core';
import { Button } from '@/components/ui/button.tsx'
import { Mention } from '@/features/annotation_tool/components/Mention.tsx'
import {Mention as MentionType} from '../types/mention'
import { SelectionProvider } from '@/features/annotation_tool/provider/SelectionProvider.tsx'
import { TokenProvider } from '@/features/annotation_tool/provider/TokenProvider.tsx'

interface props {
  id: number;
  allEntities: Record<number, any>
  m: MentionType
}

export function DraggableHand({id,allEntities,m}: props) {
  const {attributes, listeners, setNodeRef} = useDraggable({
    id: id,
  });

  function removeFromEntity(id: number) {
    allEntities.map((entity) => {
      if (entity.mention_ids.includes(id)) {
        console.log("remove id: ", id, "from entity id ", entity.id);
      }
    })
  }

  return (
    <div {...listeners} {...attributes} ref={setNodeRef} className="border-solid border-2 border-orange-600 flex ml-1 mr-1 mt-1 mb-1">
      {/*Mention id: {id}
      m: {JSON.stringify(m)}*/}
      <TokenProvider>
        <SelectionProvider>
          <Mention key={id} mention={m}></Mention>
        </SelectionProvider>
      </TokenProvider>
      {/*<div className="ml-2 bg-gray-300 p-0.5 mt-1 mb-1 rounded-md">Drag handle</div>*/}
      <Button onClick={()=>removeFromEntity(id)}>remove</Button>
    </div>
  );
}
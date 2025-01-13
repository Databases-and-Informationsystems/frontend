import {useDraggable} from '@dnd-kit/core';
import { Button } from '@/components/ui/button.tsx'
import { Mention } from '@/features/annotation_tool/components/Mention.tsx'
import {Mention as MentionType} from '../types/mention'
import { SelectionProvider } from '@/features/annotation_tool/provider/SelectionProvider.tsx'
import { TokenProvider } from '@/features/annotation_tool/provider/TokenProvider.tsx'
import { useEntity } from '@/features/annotation_tool/hooks/useEntity.ts'

interface props {
  id: number
  eid: number
  allEntities: Record<number, any>
  m: MentionType
}

export function DraggableHand({id,eid,allEntities,m}: props) {

  const {entities, loading, handleRemoveFromEntity} = useEntity()

  const {attributes, listeners, setNodeRef} = useDraggable({
    id: id,
  });

  return (
    <div ref={setNodeRef} className="border-solid border-2 border-orange-600 flex ml-1 mr-1 mt-1 mb-1">
      {/*Mention id: {id}
      m: {JSON.stringify(m)}*/}
      <TokenProvider>
        <SelectionProvider>
          <Mention key={id} mention={m}></Mention>
        </SelectionProvider>
      </TokenProvider>
      <div {...listeners} {...attributes} className="ml-2 bg-gray-300 p-0.5 mt-1 mb-1 rounded-md">Drag handle</div>
      <Button onClick={()=>handleRemoveFromEntity(eid,id)}>remove</Button>
    </div>
  );
}
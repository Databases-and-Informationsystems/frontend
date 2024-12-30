import {useDraggable} from '@dnd-kit/core';
import { Button } from '@/components/ui/button.tsx'

interface props {
  id: number;
  allEntities: Record<number, any>
}

export function DraggableHand({id,allEntities}: props) {
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
    <div ref={setNodeRef} className="border-solid border-2 border-orange-600 flex ml-1 mr-1 mt-1 mb-1">
      Mention id: {id}
      <div {...listeners} {...attributes} className="ml-2 bg-gray-300 p-0.5 mt-1 mb-1 rounded-md">Drag handle</div>
      <Button onClick={()=>removeFromEntity(id)}>remove</Button>
    </div>
  );
}
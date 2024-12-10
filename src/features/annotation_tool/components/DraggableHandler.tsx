import {useDraggable} from '@dnd-kit/core';

interface props {
  id: string;
}

export function DraggableHand({id}: props) {
  const {attributes, listeners, setNodeRef} = useDraggable({
    id: id,
  });

  return (
    <div ref={setNodeRef} className="border-solid border-2 border-orange-600 flex ml-1 mr-1 mt-1 mb-1">
      /* Some other content that does not activate dragging */
      <div {...listeners} {...attributes} className="ml-2 bg-gray-300 p-0.5 mt-1 mb-1 rounded-md">Drag handle</div>
    </div>
  );
}
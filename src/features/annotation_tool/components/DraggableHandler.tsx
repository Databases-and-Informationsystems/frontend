import {useDraggable} from '@dnd-kit/core';


export function DraggableHand() {
  const {attributes, listeners, setNodeRef} = useDraggable({
    id: 'unique-id',
  });

  return (
    <div ref={setNodeRef}>
      /* Some other content that does not activate dragging */
      <button {...listeners} {...attributes}>Drag handle</button>
    </div>
  );
}
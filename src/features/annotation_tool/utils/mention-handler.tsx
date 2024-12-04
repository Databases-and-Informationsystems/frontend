import React, { useState } from "react";
import {
  DndContext,
  useDraggable,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";

function ResizableElement() {
  const [width, setWidth] = useState(300); // initial width of the element
  const [leftOffset, setLeftOffset] = useState(0); // initial left offset of the element

  // Setup sensors for mouse events
  const sensors = useSensors(useSensor(MouseSensor));

  // Logic for dragging the left resizer
  const {
    attributes: leftAttributes,
    listeners: leftListeners,
    setNodeRef: setLeftRef,
  } = useDraggable({
    id: "left-resizer",
  });

  // Logic for dragging the right resizer
  const {
    attributes: rightAttributes,
    listeners: rightListeners,
    setNodeRef: setRightRef,
  } = useDraggable({
    id: "right-resizer",
  });

  // Handle the end of a drag event to resize the element
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    if (active.id === "left-resizer") {
      // Resize the element based on dragging the left resizer
      setWidth(width - delta.x);
      setLeftOffset(leftOffset + delta.x);
    } else if (active.id === "right-resizer") {
      // Resize the element based on dragging the right resizer
      setWidth(width + delta.x);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div
        className="resizable-container"
        style={{
          position: "relative",
          width: `${width}px`,
          left: `${leftOffset}px`,
          border: "2px solid #000",
          borderRadius: "10px"
        }}
      >
        {/* Left Resizer */}
        <div
          ref={setLeftRef}
          {...leftListeners}
          {...leftAttributes}
          style={{
            position: "absolute",
            left: "-5px",
            top: "0",
            bottom: "0",
            width: "10px",
            cursor: "ew-resize", // Ensure the cursor changes to the resize cursor
            backgroundColor: "#888",
            borderRadius: "10px"
          }}
        />

        {/* Content */}
        <div
          style={{
            padding: "10px",
            backgroundColor: "#f0f0f0",
            color: "blue"
          }}
        >
          Resize Me! (Drag left or right edges)
        </div>

        {/* Right Resizer */}
        <div
          ref={setRightRef}
          {...rightListeners}
          {...rightAttributes}
          style={{
            position: "absolute",
            right: "-5px",
            top: "0",
            bottom: "0",
            width: "10px",
            cursor: "ew-resize", // Ensure the cursor changes to the resize cursor
            backgroundColor: "#888",
            borderRadius: "10px"
          }}
        />
      </div>
    </DndContext>
  );
}

export default ResizableElement;

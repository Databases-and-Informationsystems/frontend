import { MultipleDroppables } from '@/features/annotation_tool/components/DroppableHandler.tsx'

function EntitySelection() {
  return (
    <div className="grid grid-cols-2 overflow-auto min-h-32 border-amber-500" style={{border: 'solid', height: '95vh'}}>
      <div className="bg-blue-300 overflow-auto text-black">
        /* TODO: left scroll */
        <MultipleDroppables names={["1", "2", "entity 3"]}></MultipleDroppables>
      </div>
      <div className="bg-lime-300 overflow-auto text-black">
        /* TODO: text / mention view */
      </div>
    </div>
  )
}

export default EntitySelection
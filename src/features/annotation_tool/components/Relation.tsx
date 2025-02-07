import { Relation as RelationType } from '../types'
import { Mention } from './Mention';
import { useRelationContext } from '../context/useRelationContext';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface RelationProps {
  relation: RelationType;
}

export const Relation = ({ relation }: RelationProps) => {
  const { handleDeleteRelation } = useRelationContext(); 

  const headMention = relation.head_mention;
  const tailMention = relation.tail_mention;

  if (!headMention || !tailMention) {
    return <p>Relation mentions not found</p>; 
  }

  return (
    <div>
      <Mention mention={headMention} showDeleteButton={false} isInRelation={true}/>
      &nbsp;
      <span className='p-1 text-xl font-semibold border rounded-lg border-gray-300'>{relation.tag}</span>
      &nbsp;
      <Mention mention={tailMention} showDeleteButton={false} isInRelation={true}/>
      &nbsp;
      <Button className="h-auto w-auto p-1"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteRelation(relation.id);
        }}>
        <Trash2 />
      </Button>
    </div>
  )
}

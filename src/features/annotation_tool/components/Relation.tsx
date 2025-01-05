import { Relation as RelationType } from '../types'
import { useMentionContext } from '../context/useMentionContext';
import { Mention } from './Mention';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRelationContext } from '../context/useRelationContext';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface RelationProps {
  relation: RelationType;
}

export const Relation = ({ relation }: RelationProps) => {
  const { mentions } = useMentionContext();
  const { handleDeleteRelation } = useRelationContext(); 

  const headMention = mentions.find(mention => mention.id === relation.mention_head_id);
  const tailMention = mentions.find(mention => mention.id === relation.mention_tail_id);

  if (!headMention || !tailMention) {
    return null;
  }

  return (
    <div>
      <Mention mention={headMention} showDeleteButton={false}/>
      &nbsp;
      <span className='p-1 text-xl font-semibold border rounded-lg border-gray-300'>{relation.tag}</span>
      &nbsp;
      <Mention mention={tailMention} showDeleteButton={false}/>
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

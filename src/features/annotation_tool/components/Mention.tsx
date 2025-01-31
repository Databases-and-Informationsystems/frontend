import { Mention as MentionType } from '../types/mention'
import { Badge } from '@/components/ui/badge';
import { useSelection } from '../context/useSelection';
import { useMentionContext } from '../context/useMentionContext';
import { Button } from '@/components/ui/button';
import { Check, Clock, Trash2 } from 'lucide-react';

interface MentionProps {
  mention: MentionType;
  showDeleteButton?: boolean;
  isInRelation?: boolean;
}

export const Mention = ({ mention, showDeleteButton = true, isInRelation = false }: MentionProps) => {
  const { selectedMentions, handleMentionClick } = useSelection();
  const { handleDeleteMention } = useMentionContext();

  const isSelected = selectedMentions.some((selectedMention) => selectedMention.id === mention.id);
  return (
    <span className={`select-none cursor-pointer inline-flex items-center p-1 text-xl font-semibold border rounded-lg ${isSelected ? 'border-gray-300 border-4' : 'border-gray-300'} ${mention.isShownRecommendation ? 'opacity-50' : ''}`}
      onClick={() => handleMentionClick(mention.id)}
      style={{ backgroundColor: mention.schema_mention.color }}
    >
      <span>
        {mention.tokens.map((token) => (
          <span key={token.id}>
            {token.text}
            &nbsp;
          </span>
        ))}
      </span>
      &nbsp;
      <Badge>
        {mention.tag}
      </Badge>
      &nbsp;
      {!isInRelation && (showDeleteButton ? (
        <Button
          className="h-auto w-auto p-1"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteMention(mention.id);
          }}
        >
          <Trash2 />
        </Button>
      ) : mention.isShownRecommendation ? (
        <Button className="h-auto w-auto p-1">
          <Clock />
        </Button>
      ) : (
        <Button className="h-auto w-auto p-1">
          <Check />
        </Button>
      ))}
    </span>
  )
}

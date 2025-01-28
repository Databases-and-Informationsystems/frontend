import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Mention } from './Mention'
import { Mention as MentionType } from '../types/mention';
import { useMentionContext } from '../context/useMentionContext';
import { useSchema } from '../hooks/useSchema';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SuggestedMentionProps {
  mention: MentionType;
}

export const SuggestedMention = ({ mention }: SuggestedMentionProps) => {
  const [selectedTag, setSelectedTag] = useState<string>(mention.tag);
  const { handleDeleteMention, handleUpdateMention } = useMentionContext();
  const { schema } = useSchema();

  const content = () => {
    const getMentionColor = (tag: string) => {
      const mentionSchema = schema!.mentions.find((mention) => mention.tag === tag);
      return mentionSchema!.color;
    }
    return (
      <div className="flex items-center gap-4">
        <Button
          onClick={() =>
            handleUpdateMention(mention.id,
              {
                ...mention,
                tag: selectedTag,
                isShownRecommendation: false,
              }
            )}>Accept</Button>
        <Select value={selectedTag} onValueChange={(value: string) => setSelectedTag(value)}>
          <SelectTrigger style={{ color: getMentionColor(mention.tag) }}>
            <SelectValue>{selectedTag}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Mention Tags</SelectLabel>
              {schema!.mentions.map((mentionSchema) => {
                return (
                  <SelectItem
                    key={mentionSchema.id}
                    value={mentionSchema.tag}
                    style={{ color: mentionSchema.color }}
                  >
                    {mentionSchema.tag}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button onClick={() => handleDeleteMention(mention.id)}>Reject</Button>
      </div>
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span>
          <Mention mention={mention} showDeleteButton={false} />
        </span>
      </PopoverTrigger>
      <PopoverContent>
        {content()}
      </PopoverContent>
    </Popover>
  )
}

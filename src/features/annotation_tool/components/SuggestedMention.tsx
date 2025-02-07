import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Mention } from './Mention'
import { Mention as MentionType } from '../types/mention';
import { useMentionContext } from '../context/useMentionContext';
import { useSchemaContext } from '../context/useSchemaContext';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SuggestedMentionProps {
  mention: MentionType;
}

export const SuggestedMention = ({ mention }: SuggestedMentionProps) => {
  //const [selectedTag, setSelectedTag] = useState<string>(mention.tag);
  const { handleAcceptMention, handleRejectMention } = useMentionContext();
  //const { schema } = useSchema();

  const content = () => {
    return (
      <div className="flex items-center gap-4">
        <Button
          onClick={() =>
            handleAcceptMention(mention.id)}>Accept</Button>
          {/* We don't allow updates during suggestion step atm */}
        {/* <Select value={selectedTag} onValueChange={(value: string) => setSelectedTag(value)}>
          <SelectTrigger style={{ color: mention.schema_mention.color }}>
            <SelectValue>{selectedTag}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Mention Tags</SelectLabel>
              {schema?.schema_mentions.map((mentionSchema) => {
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
        </Select> */}
        <Button onClick={() => handleRejectMention(mention.id)}>Reject</Button>
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
      <PopoverContent
        align="center"
        side="bottom"
        className="w-fit">
        {content()}
      </PopoverContent>
    </Popover>
  )
}

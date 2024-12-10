import React, { createContext } from "react";
import { useMentions } from "../hooks/useMention";
import { Mention as MentionType } from "../types";

interface MentionContextType {
    createMention: (mention: MentionType) => void;
    deleteMention: (mentionId: number) => void;
    updateMention: (mentionId: number, newMention: MentionType) => void;
    mentions: MentionType[];
}

const MentionContext = createContext<MentionContextType | undefined>(undefined);

interface MentionProviderProps {
    initialMentions: MentionType[];
    children: React.ReactNode;
}

export const MentionProvider = ({ children, initialMentions }: MentionProviderProps) => {
  const mentionContext = useMentions(initialMentions);

  return (
    <MentionContext.Provider value={mentionContext}>
      {children}
    </MentionContext.Provider>
  );
};

export default MentionContext;
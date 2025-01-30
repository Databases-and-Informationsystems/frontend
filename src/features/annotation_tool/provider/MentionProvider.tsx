import React, { createContext, useEffect } from "react";
import { useMentions } from "../hooks/useMention";
import { Mention as MentionType } from "../types";
import { fetchMentions } from "../api/mention";
import { CreateMentionPayload, UpdateMentionPayload } from "../types/mention";

interface MentionContextType {
  handleCreateMention: (payload: CreateMentionPayload) => void;
  handleDeleteMention: (mentionId: number) => void;
  handleUpdateMention: (mentionId: number, mention: UpdateMentionPayload) => void;
  handleAcceptMention: (mentionId: number) => void;
  handleRejectMention: (mentionId: number) => void;
  mentions: MentionType[];
  loading: boolean;
}

const MentionContext = createContext<MentionContextType | undefined>(undefined);

interface MentionProviderProps {
  children: React.ReactNode;
}

export const MentionProvider = ({ children }: MentionProviderProps) => {
  const {
    mentions,
    setMentions,
    loading,
    setLoading,
    handleCreateMention,
    handleUpdateMention,
    handleDeleteMention,
    handleAcceptMention,
    handleRejectMention,
  } = useMentions();

  useEffect(() => {
    const loadMentions = async () => {
      setLoading(true);
      try {
        const data = await fetchMentions();
        setMentions(data);
      } catch (err) {
        console.error("Failed to fetch mentions:", err);
      } finally {
        setLoading(false);
      }
    };
    loadMentions();
  }, [setMentions, setLoading]);

  return (
    <MentionContext.Provider value={{
      mentions,
      loading,
      handleCreateMention,
      handleUpdateMention,
      handleDeleteMention,
      handleAcceptMention,
      handleRejectMention,
    }}>
      {children}
    </MentionContext.Provider>
  );
};

export default MentionContext;
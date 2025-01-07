import React, { createContext, useState } from "react";
import { useTokens } from "../hooks/useTokens";
import { useStepNavigation } from "../hooks/useStepNavigation";

interface SelectionContextType {
  selectedTokens: string[];
  selectedMentions: string[];
  handleTokenClick: (tokenId: string, sentenceIndex: number) => void;
  handleMentionClick: (mentionId: string) => void;
  resetTokens: () => void;
  resetMentions: () => void;
}

interface SelectionProviderProps {
  children: React.ReactNode;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export const SelectionProvider = ({ children }: SelectionProviderProps) => {
  const { tokens: initialTokens } = useTokens();
  const { step } = useStepNavigation();
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [selectedMentions, setSelectedMentions] = useState<string[]>([]);

  // Select Tokens and reset selected Mentions
  const handleTokenClick = (tokenId: string, sentenceIndex: number) => {
    setSelectedMentions([]);

    if (selectedTokens.includes(tokenId)) {
      setSelectedTokens(selectedTokens.filter((id) => id !== tokenId));
      return;
    }

    const currentToken = initialTokens.find((token) => token.id === tokenId);
    if (!currentToken) return;

    if (selectedTokens.length === 0) {
      setSelectedTokens([currentToken.id]);
      return;
    }

    // Check if current token is adjacent to the selected tokens
    const isAdjacent = selectedTokens.some((selectedId) => {
      const selectedToken = initialTokens.find((token) => token.id === selectedId);
      return (
        selectedToken &&
        Math.abs(selectedToken.index_in_document - currentToken.index_in_document) === 1 &&
        selectedToken.sentence_index === sentenceIndex
      );
    });

    if (isAdjacent) {
      setSelectedTokens([...selectedTokens, currentToken.id]);
    } else {
      setSelectedTokens([currentToken.id]);
    }
  };

  const handleMentionClick = (mentionId: string) => {
    setSelectedTokens([]);

    // Deselect mention if it is already selected
    if (selectedMentions.includes(mentionId)) {
      setSelectedMentions(
        selectedMentions.filter((id) => id !== mentionId)
      );
      return;
    }

    // Mention step
    if (step === 'mentionEditing') {
      setSelectedMentions([mentionId]);
      return;
    }

    // Entity step
    if (step === 'entitySelection') {
      setSelectedMentions([...selectedMentions, mentionId]);
    }

    // Relation step
    if (step === 'relationEditing') {
      if (selectedMentions.length < 2) {
        setSelectedMentions([...selectedMentions, mentionId]);
      }
      return;
    }
  };

  const resetTokens = () => {
    setSelectedTokens([]);
  };

  const resetMentions = () => {
    setSelectedMentions([]);
  };

  return (
    <SelectionContext.Provider
      value={{
        selectedTokens,
        selectedMentions,
        handleTokenClick,
        handleMentionClick,
        resetTokens,
        resetMentions,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export default SelectionContext;
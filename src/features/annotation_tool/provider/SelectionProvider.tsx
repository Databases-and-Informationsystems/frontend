import React, { createContext, useState } from "react";
import { Token as TokenType } from "../types";

interface SelectionContextType {
  selectedTokens: number[];
  selectedMentions: number[];
  setCurrentStep: (step: number) => void;
  currentStep: number;
  handleTokenClick: (tokenId: number, sentenceIndex: number) => void;
  handleMentionClick: (mentionId: number) => void;
  resetTokens: () => void;
  resetMentions: () => void;
}

interface SelectionProviderProps {
  initialTokens: TokenType[];
  children: React.ReactNode;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export const SelectionProvider = ({ children, initialTokens }: SelectionProviderProps) => {
  const [currentStep, setCurrentStep] = useState<number>(3);
  const [selectedTokens, setSelectedTokens] = useState<number[]>([]);
  const [selectedMentions, setSelectedMentions] = useState<number[]>([]);

  // Select Tokens and reset selected Mentions
  const handleTokenClick = (tokenId: number, sentenceIndex: number) => {
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

  const handleMentionClick = (mentionId: number) => {
    setSelectedTokens([]);

    // Deselect mention if it is already selected
    if (selectedMentions.includes(mentionId)) {
      setSelectedMentions(
        selectedMentions.filter((id) => id !== mentionId)
      );
      return;
    }

    // Mention step
    if (currentStep === 2) {
      setSelectedMentions([mentionId]);
      return;
    }

    // Entity step
    if (currentStep === 5) {
      setSelectedMentions([...selectedMentions, mentionId]);
    }

    // Relation step
    if (currentStep === 3) {
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
        setCurrentStep,
        currentStep,
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
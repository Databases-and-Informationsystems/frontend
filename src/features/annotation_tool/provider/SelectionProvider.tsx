import React, { createContext, useState } from "react";
import { useTokens } from "../hooks/useTokens";
import { Mention, Token } from "../types";
import { useMentionContext } from "../context/useMentionContext";

interface SelectionContextType {
  selectedTokens: Token[];
  selectedMentions: Mention[];
  setCurrentStep: (step: number) => void;
  currentStep: number;

  handleTokenClick: (tokenId: number, sentenceIndex: number) => void;
  handleMentionClick: (mentionId: number) => void;

  resetTokens: () => void;
  resetMentions: () => void;
}

interface SelectionProviderProps {
  children: React.ReactNode;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export const SelectionProvider = ({ children }: SelectionProviderProps) => {
  const { tokens: allTokens } = useTokens();
  const { mentions: allMentions } = useMentionContext();
  const [currentStep, setCurrentStep] = useState<number>(3);
  const [selectedTokens, setSelectedTokens] = useState<Token[]>([]);
  const [selectedMentions, setSelectedMentions] = useState<Mention[]>([]);

  // Select Tokens and reset selected Mentions
  const handleTokenClick = (tokenId: number, sentenceIndex: number) => {
    resetMentions();

    const currentToken = allTokens.find((token) => token.id === tokenId);
    if(!currentToken) return;

    const alreadySelected = selectedTokens.some((token) => token.id === tokenId);
    if(alreadySelected) {
      setSelectedTokens(selectedTokens.filter((token) => token.id !== tokenId));
      return;
    }

    if (selectedTokens.length === 0) {
      setSelectedTokens([currentToken]);
      return;
    }

    // Check if current token is adjacent to the selected tokens
    const isAdjacent = selectedTokens.some((selectTok) => {
      return (
        Math.abs(selectTok.document_index - currentToken.document_index) === 1 &&
        selectTok.sentence_index === sentenceIndex
      );
    });

    if (isAdjacent) {
      setSelectedTokens([...selectedTokens, currentToken]);
    } else {
      setSelectedTokens([currentToken]);
    }
  };

  const handleMentionClick = (mentionId: number) => {
    resetTokens();

    const mention = allMentions.find((mention) => mention.id === mentionId);
    if (!mention) return;

    const alreadySelected = selectedMentions.some((mention) => mention.id === mentionId);
    if (alreadySelected) {
      setSelectedMentions(selectedMentions.filter((mention) => mention.id !== mentionId));
      return;
    }

    // Mention step
    if (currentStep === 2) {
      setSelectedMentions([mention]);
      return;
    }

    // Entity step
    if (currentStep === 5) {
      setSelectedMentions([...selectedMentions, mention]);
    }

    // Relation step
    if (currentStep === 4) {
      if (selectedMentions.length < 2) {
        setSelectedMentions([...selectedMentions, mention]);
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
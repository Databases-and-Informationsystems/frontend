import { Mention } from "./Mention";
import { Mention as MentionType } from "../types";
import { SuggestedMention } from "./SuggestedMention";

interface EnhancedMentionProps {
    mention: MentionType;
}

export const EnhancedMention = ({ mention }: EnhancedMentionProps) => {
    if (mention.isShownRecommendation) {
        return <SuggestedMention mention={mention} />;
    }
    return <Mention mention={mention} />;
};
import { Mention } from "./Mention";
import { Mention as MentionType } from "../types";
import { SuggestedMention } from "./SuggestedMention";

interface EnhancedMentionProps {
    mention: MentionType;
    showDeleteButton?: boolean;
}

export const EnhancedMention = ({ mention, showDeleteButton }: EnhancedMentionProps) => {
    if (mention.isShownRecommendation) {
        return <SuggestedMention mention={mention} />;
    }
    return <Mention mention={mention} showDeleteButton={showDeleteButton}/>;
};
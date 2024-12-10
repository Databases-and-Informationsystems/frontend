import { useContext } from "react";
import RelationContext from "../provider/RelationProvider";

export const useRelationContext = () => {
    const context = useContext(RelationContext);
    if (!context) {
        throw new Error('useRelationContext must be used within RelationProvider');
    }
    return context;
}
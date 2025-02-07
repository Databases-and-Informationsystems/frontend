import { useContext } from "react";
import TokenContext from "../provider/TokenProvider";

export const useTokensContext = () => {
    const context = useContext(TokenContext);

    if (!context) {
        throw new Error("useTokens must be used within a TokenProvider");
    }

    return context;
}
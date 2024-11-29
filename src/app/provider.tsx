import React from "react";
import { ThemeProvider } from "./providers/ThemeProvider";

interface AppProviderProps {
    children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
    return (
        <ThemeProvider >
            {/* Here we can add Providers which should be accesible throughout the whole app */}
            {children}
        </ThemeProvider>
    );
}
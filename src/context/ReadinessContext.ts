import { createContext } from "react";

interface ReadinessContextType {
    readyMap: Record<string, boolean>;
    setReady: (key: string, value: boolean) => void;
    isReady: boolean;
}

export const ReadinessContext = createContext<ReadinessContextType>({
    readyMap: {},
    setReady: () => {},
    isReady: false,
})
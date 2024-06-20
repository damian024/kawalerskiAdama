import { useState, useEffect, useCallback } from "react";

export type GameStateUpdater<T> = (newState: T, timeout?: number) => void;
export const useGameState = <T,>(startValue : T) => {
    const [state, setState] = useState<T>(startValue);
    const [transitionTimeout, setTransitionTimeout] = useState<NodeJS.Timeout| undefined>(undefined);

    useEffect(() => {
        () => clearTimeout(transitionTimeout);
    },[transitionTimeout])

    const setGameState = useCallback((newState : T, delay?: number) => {
        let timeoutId = setTimeout(() => setState(newState), delay ?? 100);
        setTransitionTimeout(timeoutId);
    },[setTransitionTimeout, setState]);

    return [state, setGameState as GameStateUpdater<T>] as const;
}



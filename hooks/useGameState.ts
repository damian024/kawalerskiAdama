import { useState, useEffect, useCallback } from "react";
import { AudioPlayerFactory, useAudioPlayer } from "./useAudioPlayer";

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


export type GameStatusChangeHandler<T> = (state: T, setState: GameStateUpdater<T>, player: AudioPlayerFactory ) => void;

export const useGameStateMachine = <T,>(startState : T, afterChange: GameStatusChangeHandler<T>) => {
    const [state, setState] = useGameState<T>(startState);
    const audioPlayer = useAudioPlayer();

    useEffect(() => {
        afterChange(state, setState, audioPlayer);
        return;
    }, [state, setState, audioPlayer]);

    return [state, setState, audioPlayer] as const;
}
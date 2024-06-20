import { useEffect } from "react";
import { PlayAudio, useAudioPlayer } from "./useAudioPlayer";
import { GameStateUpdater, useGameState } from "./useGameState";

export type GameStatusChangeHandler<T> = (oldState: T, newstate: T, setState: GameStateUpdater<T>, player: PlayAudio) => void;
export const useGameStateMachine = <T>(startState: T, handleTransition: GameStatusChangeHandler<T>) => {
    const [state, setState] = useGameState(startState);
    const [playAudio, pauseAudio] = useAudioPlayer();

    useEffect(() => {
        setTimeout(async () => {
            pauseAudio();
            handleTransition(startState, state, setState, playAudio)
        }, 1)
    }, [state, setState, playAudio]);

    const makeTransition = async (newGameState: T) => {
        if (newGameState == state) {
            return;
        }

        setState(newGameState);
    };

    return [state, makeTransition, playAudio] as const;
};

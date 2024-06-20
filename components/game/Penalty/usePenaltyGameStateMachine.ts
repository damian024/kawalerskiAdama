import { Sounds } from "@/common/sounds";
import { AudioPlayerFactory, useAudioPlayer } from "@/hooks/useAudioPlayer";
import { GameStateUpdater, useGameState } from "@/hooks/useGameState";
import { useEffect } from "react";

export enum PenaltyGameStatus {
    Waiting,
    Prepairing,
    Started,
    Passed,
    Failed,
    ChickenPenalty,
    FailedPenalty,
    Finished
}

const afterStateChanged = (gameState: PenaltyGameStatus, setGameState: GameStateUpdater<PenaltyGameStatus>, player: AudioPlayerFactory) => {
    player().pause();

    if (gameState == PenaltyGameStatus.Passed) {
        player(Sounds.MISSION_PASSED).play();
        return setGameState(PenaltyGameStatus.Finished, 10000);
    }

    if (gameState == PenaltyGameStatus.Failed) {
        player(Sounds.MISSION_FAILED).play();
        return setGameState(PenaltyGameStatus.FailedPenalty, 5000);
    }
};

export const usePenaltyGameStateMachine = () => {
    const [state, setState] = useGameState(PenaltyGameStatus.Waiting);
    const player = useAudioPlayer();

    useEffect(() => {
        afterStateChanged(state, setState, player);
        return;
    }, [state,setState, player]);

    const makeTransition = async (gameState: PenaltyGameStatus) => {
        if (gameState == state) {
            return;
        }

        setState(gameState);
    };

    return [state, makeTransition, player] as const;
};
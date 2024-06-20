import { Sounds } from "@/common/sounds";
import { PlayAudio } from "@/hooks/useAudioPlayer";
import { GameStateUpdater } from "@/hooks/useGameState";
import { useGameStateMachine } from "@/hooks/useGameStateMachine";
import { useEffect } from "react";

export enum PenaltyGameStatus {
    Waiting,
    Prepairing,
    Started,
    Passed,
    Failed,
    ChickenPenalty,
    FailedPenalty,
    Completed
}

const handleTransition = (oldGameState: PenaltyGameStatus, newGameState: PenaltyGameStatus, setGameState: GameStateUpdater<PenaltyGameStatus>, player: PlayAudio) => {
    if (newGameState == PenaltyGameStatus.Passed) {
        player(Sounds.MISSION_PASSED);
        return setGameState(PenaltyGameStatus.Completed, 10000);
    }

    if (newGameState == PenaltyGameStatus.Failed) {
        player(Sounds.MISSION_FAILED);
        return setGameState(PenaltyGameStatus.FailedPenalty, 5000);
    }
};

export const usePenaltyGameStateMachine = () => {
    return useGameStateMachine(PenaltyGameStatus.Waiting, handleTransition);
};
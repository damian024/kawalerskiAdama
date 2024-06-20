import { GameStateUpdater, useGameState, useGameStateMachine } from "@/hooks/useGameState";
import { wait } from "@/common/timeouts";
import { AudioPlayerFactory, useAudioPlayer } from "../../../hooks/useAudioPlayer";
import { Sounds } from "@/common/sounds";
import { useEffect } from "react";

export enum QuestionGameState {
    TimeOut,
    Win,
    Lose,
    Selected,
    Started,
    Prepare,
    QuestionShown,
    Completed
}

const afterStateChanged = (gameState: QuestionGameState, setGameState: GameStateUpdater<QuestionGameState>, player: AudioPlayerFactory) => {
    if (gameState == QuestionGameState.Prepare) {
        player(Sounds.APPEARED).play();
        return setGameState(QuestionGameState.QuestionShown, 2000);
    }

    if (gameState == QuestionGameState.QuestionShown) {
        player(Sounds.APPEARED).play();
    }

    if (gameState == QuestionGameState.Started) {
        player(Sounds.TICK).play();
    }

    if (gameState == QuestionGameState.Selected) {
        player(Sounds.VOTE).play();
    }

    if (gameState == QuestionGameState.Win) {
        let audio = player(Sounds.WIN);
        audio.play();
        return setGameState(QuestionGameState.Completed, 10000);
    }

    if (gameState == QuestionGameState.Lose) {
        let audio = player(Sounds.LOSE);
        audio.play();
        return setGameState(QuestionGameState.Completed, 10000);
    }

    if (gameState == QuestionGameState.TimeOut) {
        return setGameState(QuestionGameState.Lose, 3000);
    }
};

const beforeStateChanged = async (gameState: QuestionGameState, setGameState: GameStateUpdater<QuestionGameState>, player: AudioPlayerFactory) => {
    if (gameState == QuestionGameState.Lose) {
        setGameState(QuestionGameState.Selected);
        await wait(Math.random() * 12000 + 5000);
        setGameState(QuestionGameState.Lose);
    }
    else if (gameState == QuestionGameState.Win) {
        setGameState(QuestionGameState.Selected);
        await wait(Math.random() * 12000 + 5000);
        setGameState(QuestionGameState.Win);
    }
    else
    {
        setGameState(gameState);
    }
}


export const useQuestionGameStateMachine = (onCompleted: (isWinning: boolean) => void, isWinning: boolean) => {
    const [gameState, setGameState, audioPlayer] =  useGameStateMachine(QuestionGameState.Prepare, beforeStateChanged, afterStateChanged);

    useEffect(() => {
        if(gameState == QuestionGameState.Completed)
            onCompleted(isWinning);
    },[gameState, isWinning, onCompleted])

    const makeTransition = async (gameState: QuestionGameState) => {
        if (gameState == gameState) {
            return;
        }
        else if (gameState == QuestionGameState.Lose) {
            setGameState(QuestionGameState.Selected);
            await wait(Math.random() * 12000 + 5000);
            setGameState(QuestionGameState.Lose);
        }
        else if (gameState == QuestionGameState.Win) {
            setGameState(QuestionGameState.Selected);
            await wait(Math.random() * 12000 + 5000);
            setGameState(QuestionGameState.Win);
        }
        else {
            setGameState(gameState);
        }
    };

    return [gameState, makeTransition, audioPlayer] as const;
};


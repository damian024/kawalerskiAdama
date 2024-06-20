import { useEffect } from "react";
import { useGameState } from "@/hooks/useGameState";
import { PlayAudio, useAudioPlayer } from "../../../hooks/useAudioPlayer";
import { QuestionGameState } from "./SelectedQuestion";
import { Sounds } from "@/common/sounds";
import { useGameStateMachine } from "@/hooks/useGameStateMachine";



const handleTransition = (oldGameState: QuestionGameState, nextGameState: QuestionGameState, setGameState: (newState: QuestionGameState, timeout?: number | undefined) => unknown, playAudio: PlayAudio) => {

    if (nextGameState == QuestionGameState.Prepare) {
        playAudio(Sounds.APPEARED);
        return setGameState(QuestionGameState.QuestionShown, 3000);
    }

    if (nextGameState == QuestionGameState.QuestionShown) {
        playAudio(Sounds.APPEARED);
        return;
    }

    if (nextGameState == QuestionGameState.Started) {
        playAudio(Sounds.TICK);
        return;
    }

    if (nextGameState == QuestionGameState.Selected) {
        playAudio(Sounds.VOTE);
        let delay = (Math.random() * 12000 + 5000);
        return setGameState(QuestionGameState.ShownResult, delay);
    }

    if (nextGameState == QuestionGameState.ShownResult) {
        playAudio(Sounds.WIN);
        return setGameState(QuestionGameState.Completed, 12000);
    }

    /*if (gameState == QuestionGameState.Win) {
        let audio = player(Sounds.WIN);
        audio;
        console.log(audio.duration);
        return setGameState(QuestionGameState.Completed, 10000);
    }

    if (gameState == QuestionGameState.Lose) {
        let audio = player(Sounds.LOSE);
        audio;
        console.log(audio.duration);
        return setGameState(QuestionGameState.Completed, 10000);
    }

    if (gameState == QuestionGameState.TimeOut) {
        return setGameState(QuestionGameState.Lose, 3000);
    }*/
};


export const useQuestionGameStateMachine = () => {
    return useGameStateMachine(QuestionGameState.Prepare, handleTransition);
};

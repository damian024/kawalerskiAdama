import { useEffect } from "react";
import { useGameState } from "@/hooks/useGameState";
import { AudioPlayerFactory, useAudioPlayer } from "../../../hooks/useAudioPlayer";
import { QuestionGameState } from "./SelectedQuestion";
import { Sounds } from "@/common/sounds";



const useStateFlow = (gameState: QuestionGameState, setGameState: (newState: QuestionGameState, timeout?: number | undefined) => unknown, player: AudioPlayerFactory) => {
    player().pause();

    if (gameState == QuestionGameState.Prepare) {
        player(Sounds.APPEARED).play();
        return setGameState(QuestionGameState.QuestionShown, 3000);
    }

    if (gameState == QuestionGameState.QuestionShown) {
        player(Sounds.APPEARED).play();
    }

    if (gameState == QuestionGameState.Started) {
        player(Sounds.TICK).play();
    }

    if (gameState == QuestionGameState.Selected) {
        player(Sounds.VOTE).play();
        let delay = (Math.random() * 12000 + 5000);
        return setGameState(QuestionGameState.ShownResult, delay);
    }

    if (gameState == QuestionGameState.ShownResult) {
        player(Sounds.WIN).play();
        return setGameState(QuestionGameState.Completed, 12000);
    }

    /*if (gameState == QuestionGameState.Win) {
        let audio = player(Sounds.WIN);
        audio.play();
        console.log(audio.duration);
        return setGameState(QuestionGameState.Completed, 10000);
    }

    if (gameState == QuestionGameState.Lose) {
        let audio = player(Sounds.LOSE);
        audio.play();
        console.log(audio.duration);
        return setGameState(QuestionGameState.Completed, 10000);
    }

    if (gameState == QuestionGameState.TimeOut) {
        return setGameState(QuestionGameState.Lose, 3000);
    }*/
};


export const useQuestionGameStateMachine = () => {
    const [state, setState] = useGameState(QuestionGameState.Prepare);
    const player = useAudioPlayer();

    useEffect(() => {
        useStateFlow(state, setState, player);
        return;
    }, [state]);

    const makeTransition = async (gameState: QuestionGameState) => {
        if (gameState == state) {
            return;
        }
        /*else if (gameState == QuestionGameState.Lose) {
            setState(QuestionGameState.Selected);
            await wait(Math.random() * 12000 + 5000);
            setState(QuestionGameState.Lose);
        }
        else if (gameState == QuestionGameState.Win) {
            setState(QuestionGameState.Selected);
            await wait(Math.random() * 12000 + 5000);
            setState(QuestionGameState.Win);
        }
        else {*/
            setState(gameState);
        //}
    };

    return [state, makeTransition] as const;
};

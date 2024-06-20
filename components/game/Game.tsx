"use client";
import { Config, GameConfig} from "@/common/configProvider";
import { produce } from "immer";
import { useEffect, useState } from "react"
import { MainMenuPage } from "./MainMenu/MainMenuPage";
import { PenaltiesPage } from "./Penalty/PenaltiesPage";
import { QuestionsPage } from "./Questions/QuestionsPage";
import { ChoiceGameplayMenu } from "./MainMenu/ChoiceGameplayMenu";

export enum GameState {
    MainMenu,
    Question,
    Penalty,
    ModeChoice
}

export const Game = () => {
    const [questions, setQuestions] = useState(Config.questions);
    const [penalties, setPenalties] = useState(Config.penalties);
    const [gameState, setGameState] = useState<GameState>(GameState.MainMenu);

    useEffect(() => {
        if(Config.penalties == penalties && Config.questions == questions)
            return;
        localStorage.setItem("save", JSON.stringify({penalties, questions}));
    },[penalties, questions])

    const onQuestionCompleted = (questionId : number, success : boolean) => {
        setGameState(GameState.ModeChoice);
        setQuestions(questions => produce(questions, draft => {
            draft[questionId].answeredCorrectly = success
        }));
    }

    const onClearSave = () => {
        localStorage.removeItem("save");
    }

    const onGameStart = (loadGame: boolean) => {
        if(loadGame){
            let gameSave = JSON.parse(localStorage.getItem("save")!) as GameConfig;
            console.log(gameSave);
            setPenalties(gameSave.penalties);
            setQuestions(gameSave.questions);
        }
        setGameState(GameState.ModeChoice)
    }

    const onGameModeChange = (newGameState: GameState) => {
        setGameState(newGameState);
    }

    const onPenaltyCompleted = (penaltyId: number, success: boolean) => {
        setGameState(GameState.ModeChoice);
        setPenalties(penalties => produce(penalties, draft => {
            draft[penaltyId].completed = true;
        }));

        console.log(penalties);
    }

    if(gameState == GameState.MainMenu)
        return <MainMenuPage onGameStart={onGameStart} clearSave={onClearSave}/>
    
    if(gameState == GameState.ModeChoice)
        return <ChoiceGameplayMenu changeGameModeHandler={onGameModeChange}/>
    
    else if(gameState == GameState.Question)
        return <QuestionsPage questions={questions} key={Date.now()} onTaskCompleted={onQuestionCompleted} />

    else if(gameState == GameState.Penalty)
        return <PenaltiesPage penalties={penalties} onTaskCompleted={onPenaltyCompleted} />

    return <div>Invalid game state</div>
}




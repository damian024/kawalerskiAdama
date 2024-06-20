import { QuestionConfig } from "@/common/configProvider";
import { useEffect, useState } from "react";
import Image from "next/image";
import profilePic from '../../../app/images/player.png'
import { QuestionGameStatus } from "./QuestionGameStatus";
import { useQuestionGameStateMachine } from "./useQuestionGameStateMachine";

enum ButtonState{
    Default,
    HiddenText,
    Selected,
    Winning,
    Losing
};

export enum QuestionGameState {
    Prepare,
    QuestionShown,
    Started,
    Selected,
    ShownResult,
    Completed
}

const getButtonState = (gameState : QuestionGameState, currentIndex: number, selectedIndex: number, winningIndex : number) => {
    if(gameState == QuestionGameState.Prepare || gameState == QuestionGameState.QuestionShown)
        return ButtonState.HiddenText;

    if(gameState == QuestionGameState.Selected)
        return ButtonState.Selected;

    if(gameState == QuestionGameState.ShownResult){
        if(currentIndex == winningIndex){
            return ButtonState.Winning
        }
        return ButtonState.Losing
    }
    
    return ButtonState.Default;
}

type SelectedQuestionProps = {
    question: QuestionConfig;
    questionCompleted: (success: boolean) => void;
};
export const SelectedQuestion = (props: SelectedQuestionProps) => {
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number>(-1);
    const [gameState, setGameState] = useQuestionGameStateMachine();
    const winningIndex = props.question.validAnswerIndex;

    useEffect(() => {
        if(gameState == QuestionGameState.Completed)
            props.questionCompleted(props.question.validAnswerIndex == selectedAnswerIndex);
    },[gameState])

    return (
        <div className="h-full flex flex-col bg-questions-selected gap-5">
            <div className="flex flex-row basis-2/5 justify-between items-center m-5">
                <div className="h-full basis-1/2 flex flex-row justify-center items-center">
                    <QuestionGameStatus 
                        onTimerEvent={(newState : QuestionGameState) => {setGameState(newState)}}
                        timeLimit={props.question.time} 
                        state={gameState} 
                        paused={selectedAnswerIndex != -1}/>
                </div>
                <div className="basis-1/2 flex flex-row justify-center align-bottom">
                    <Image 
                        className="object-contain w-2/5"
                        alt="Picture of the author"
                        src={profilePic}/>
                </div>
            </div>
            <div className="flex flex-row basis-2/5 mt-20 m-10 gap-5">
                <div className="flex flex-col gap-10 w-full">
                    <div className="basis-1/2">
                        <div className="p-5 flex h-full text-5xl text-center bg-gradient-to-tr from-orange-300 via-black via-0% to-cyan-700 justify-center items-center text-white border rounded-lg">
                            <span>{gameState == QuestionGameState.Prepare ? "?" : props.question.text}</span>
                        </div>
                    </div>
                    <div className="flex flex-row basis-1/2 gap-10">
                        { 
                            props.question.answers.map((a, i) => (
                                <div 
                                    key={i} 
                                    className="basis-1/3 h-full">
                                    <AnswerBox
                                            question={props.question}
                                            answerIndex={i}
                                            state={getButtonState(gameState, i, selectedAnswerIndex, winningIndex)} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};


const getColor = (buttonState : ButtonState) => {
    switch(buttonState){
        case ButtonState.Losing: return "bg-gradient-to-r from-sky-900 to-red-600";
        case ButtonState.Winning: return "bg-gradient-to-r from-sky-900 to-green-600";
        case ButtonState.Selected: return "bg-gradient-to-r from-sky-900 to-amber-400";
        default: return "bg-gradient-to-tr from-orange-300 via-black via-0% to-cyan-700";
    }
}

type AnswerBoxProps = {
    question: QuestionConfig
    answerIndex: number;
    state: ButtonState;
};
const AnswerBox = (props: AnswerBoxProps) => {
    const text = props.state == ButtonState.HiddenText ? "" : props.question.answers[props.answerIndex]
    return (
        <div className={`${getColor(props.state)} p-4 h-full text-white text-3xl border rounded-lg flex flex-col justify-center text-center items`}>
                <span className="text-yellow-500">{String.fromCharCode(65 + props.answerIndex)} </span>
                <span>{text}</span>
        </div>
    );
};

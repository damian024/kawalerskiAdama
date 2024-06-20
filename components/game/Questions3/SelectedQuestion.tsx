import { QuestionConfig } from "@/common/configProvider";
import { useEffect, useState } from "react";
import Image from "next/image";
import profilePic from '../../../app/images/player.png'
import { QuestionGameStatus } from "./QuestionGameStatus";
import { QuestionGameState, useQuestionGameStateMachine } from "./useQuestionGameStateMachine";

enum ButtonState{
    Default,
    HiddenText,
    Selected,
    Winning,
    Losing
};

const getButtonState = (gameState : QuestionGameState, currentIndex: number, selectedIndex: number, winningIndex : number) => {
    if(gameState == QuestionGameState.Prepare || gameState == QuestionGameState.QuestionShown)
        return ButtonState.HiddenText;

    if((gameState == QuestionGameState.Win || gameState == QuestionGameState.Lose) && currentIndex == winningIndex)
        return ButtonState.Winning;

    if(currentIndex == selectedIndex){
        if(gameState == QuestionGameState.Lose)
            return ButtonState.Losing;
        if(gameState == QuestionGameState.Selected)
            return ButtonState.Selected;
    }

    return ButtonState.Default;
}

type SelectedQuestionProps = {
    question: QuestionConfig;
    questionCompleted: (success: boolean) => void;
};
export const SelectedQuestion = (props: SelectedQuestionProps) => {
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number>(-1);
    const isWinning = props.question.validAnswerIndex == selectedAnswerIndex;
    const [gameState, setGameState] = useQuestionGameStateMachine(props.questionCompleted, isWinning);

    const onSelectTile = async (answerIndex: number) => {
        if(gameState != QuestionGameState.Started)
            return;

        setSelectedAnswerIndex(answerIndex);
        setGameState(props.question.validAnswerIndex == answerIndex ? QuestionGameState.Win : QuestionGameState.Lose);
    };

    return (
        <div className="h-full bg-questions-selected">
            <div className="p-10 flex flex-col justify-stretch">
                <div className="px-20 flex flex-row align-middle items-center justify-between gap-10 h-3/5">
                    <div className="h-2/5 w-3/5">
                        <QuestionGameStatus 
                            onTimerEvent={(newState : QuestionGameState) => setGameState(newState)}
                            timeLimit={props.question.time} 
                            state={gameState} 
                            paused={selectedAnswerIndex != -1}/>
                    </div>
                    <div className="h-full">
                        <Image 
                            className="object-scale-down max-h-full"
                            alt="Picture of the author"
                            src={profilePic}/>
                        <img src={""}></img>
                    </div>
                </div>
                <div className="p-10 pt-0 h-2/5 grid gap-5">
                    <div className="">
                        <div className="p-5 w-100 text-center bg-gradient-to-tr from-orange-300 via-black via-0% to-cyan-700 text-white border rounded-lg">
                            {gameState == QuestionGameState.Prepare ? "?" : props.question.text}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-10">
                        {
                            props.question.answers.map((a, i) => (
                                <AnswerBox
                                        key={i}
                                        question={props.question}
                                        answerIndex={i}
                                        state={getButtonState(gameState, i, selectedAnswerIndex, props.question.validAnswerIndex)}
                                        selectTile={onSelectTile} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
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
    selectTile: (index: number) => void;
};
const AnswerBox = (props: AnswerBoxProps) => {
    const text = props.state == ButtonState.HiddenText ? "?" : props.question.answers[props.answerIndex]
    return (
        <div className={`${getColor(props.state)} p-4 text-white border rounded-lg cursor-pointer`}
            onClick={() => props.selectTile(props.answerIndex)}>
                <span className="text-yellow-500">{String.fromCharCode(65 + props.answerIndex)}. </span>
                <span>{text}</span>
        </div>
    );
};

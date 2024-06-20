import { QuestionGameState } from "./SelectedQuestion";
import { GameTimer } from "../Common/GameTimer";

type QuestionTimerProps = {
    paused: boolean
    timeLimit: number,
    state: QuestionGameState,
    onTimerEvent?: (nextState : QuestionGameState) => void;
}

const getGameMessage = (gameState: QuestionGameState) => {
    switch (gameState) {
        case QuestionGameState.ShownResult: return "Zapadnia opada";
        case QuestionGameState.Prepare: return "Przygotuj się";
        default: return null;
    }
};

export const QuestionGameStatus = (props: QuestionTimerProps) => {
    if(props.state == QuestionGameState.QuestionShown){
        return (
            <div className="h-full w-full cursor-pointer p-5 aspect-auto text-center bg-slate-900 bg-opacity-70 text-yellow-100 text-8xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] flex justify-center items-center">
                <GameTimer
                    key={1}
                    disableColors={true}
                    paused={false} 
                    timeLimit={3}
                    onTimeLeft={() => props.onTimerEvent?.(QuestionGameState.Started)}/>
            </div>
        )
    }

    if(props.state == QuestionGameState.Started){
        return (
            <div className="h-full w-full cursor-pointer p-5 aspect-auto text-center bg-slate-900 bg-opacity-70 text-yellow-100 text-8xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] flex justify-center items-center"
                onClick={() => props.onTimerEvent?.(QuestionGameState.Selected)}>
                <GameTimer
                    key={2}
                    paused={props.paused} 
                    timeLimit={props.timeLimit}/>
            </div>

        )
    }

    let message = getGameMessage(props.state);

    if(message)
        return (
            <div className="h-full w-full cursor-pointer p-5 aspect-auto text-center bg-slate-900 bg-opacity-70 text-yellow-100 text-8xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] flex justify-center items-center">
                <span>{message}</span>
            </div>
        )

    return null;
}



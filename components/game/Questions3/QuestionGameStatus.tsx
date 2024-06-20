import { GameTimer } from "../Common/GameTimer";
import { QuestionGameState } from "./useQuestionGameStateMachine";

type QuestionTimerProps = {
    paused: boolean
    timeLimit: number,
    state: QuestionGameState,
    onTimerEvent: (nextState : QuestionGameState) => void;
}

const getGameMessage = (gameState: QuestionGameState) => {
    switch (gameState) {
        case QuestionGameState.Win: return "Odpowiedziałeś poprawnie";
        case QuestionGameState.Lose: return "Błędna odpowiedź";
        case QuestionGameState.Prepare: return "Przygotuj się";
        case QuestionGameState.TimeOut: return "Koniec czasu";
        default: return null;
    }
};

export const QuestionGameStatus = (props: QuestionTimerProps) => {
    if(props.state == QuestionGameState.QuestionShown){
        return (
            <GameTimer
                key={1}
                disableColors={true}
                paused={false} 
                timeLimit={10}
                onTimeLeft={() => props.onTimerEvent(QuestionGameState.Started)}/>
        )
    }

    if(props.state == QuestionGameState.Started){
        return (
            <GameTimer
                key={2}
                paused={props.paused} 
                timeLimit={props.timeLimit} 
                onTimeLeft={() => props.onTimerEvent(QuestionGameState.TimeOut)}/>
        )
    }

    let message = getGameMessage(props.state);

    if(message)
        return <div className="h-1/5 p-10 aspect-auto text-center bg-slate-900 bg-opacity-60 text-yellow-200 text-8xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] flex justify-center items-center">
            <span>{message}</span>
            </div>

    return null;
}



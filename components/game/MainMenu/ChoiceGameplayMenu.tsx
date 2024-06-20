import { GameState } from "../Game";

type ChoiceGameplayMenuProps = {
    changeGameModeHandler: (newGameState : GameState) => void;
}
export const ChoiceGameplayMenu  = (props : ChoiceGameplayMenuProps) => {
    return (
        <div className="h-screen flex flex-row justify-evenly items-center bg-gradient-to-r from-cyan-500 to-blue-500">
            <button 
                className="bg-slate-100 h-40 w-80 hover:bg-slate-300 text-black font-bold py-8 px-20 rounded  text-5xl"
                onClick={() => props.changeGameModeHandler(GameState.Question)}>
                    Pytania
            </button>
            <button 
                className="bg-slate-100 h-40 w-80 hover:bg-slate-300 text-black font-bold py-8 px-16 rounded text-5xl" 
                onClick={() => props.changeGameModeHandler(GameState.Penalty)}>
                    Zadania
            </button>
        </div>
    )
}
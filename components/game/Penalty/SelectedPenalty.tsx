import { PenaltyConfig } from "@/common/configProvider";
import { GameTimer } from "../Common/GameTimer";
import { useEffect, useState } from "react";
import { Sounds } from "@/common/sounds";
import Image from "next/image";
import { PenaltyGameStatus, usePenaltyGameStateMachine } from "./usePenaltyGameStateMachine";
import localFont from 'next/font/local'
import vodkaGlass from '../../../app/images/vodka-glass.png'

const myFont = localFont({ src: "../../../public/diploma.ttf" })

type SelectedPenaltyProps = {
    penalty: PenaltyConfig;
    onCompleted: () => void;
};

export const SelectedPenalty = (props: SelectedPenaltyProps) => {
    var [gameState, setGameState, audioPlayer] = usePenaltyGameStateMachine();
    var [penaltyGlassIds, setPenaltyGlassIds] = useState<number[]>([]);

    const showTaskText = gameState == PenaltyGameStatus.Waiting ||
        gameState == PenaltyGameStatus.Prepairing ||
        gameState == PenaltyGameStatus.Started;

    useEffect(() => {
        if(gameState == PenaltyGameStatus.Finished)
            props.onCompleted();

        if(gameState == PenaltyGameStatus.FailedPenalty){
            let glassCount = Math.floor(Math.random()* 4) + 1;
            setPenaltyGlassIds([...new Array(glassCount)].map(x => Math.floor(Math.random() * 10) + 1 ))
        }
    },[gameState, props.onCompleted, setPenaltyGlassIds]);

    const showReadyTimer = gameState == PenaltyGameStatus.Waiting || gameState == PenaltyGameStatus.Prepairing;
    const canResign = gameState != PenaltyGameStatus.Failed && gameState != PenaltyGameStatus.Passed;

    if(gameState == PenaltyGameStatus.ChickenPenalty){
        return (
            <div className="h-full bg-white flex flex-col items-center justify-evenly">
                <div className="text-8xl">Czas przeczyścić leja</div>
                <button 
                    className="bg-green-500 hover:bg-green-700 text-5xl text-white font-bold py-16 px-36 rounded" 
                    onClick={() => setGameState(PenaltyGameStatus.Finished)}>
                        Powrót do gry
                </button>
            </div>
        )
    }

    if(gameState == PenaltyGameStatus.FailedPenalty){
        
        return (
            <div className="h-full bg-white flex flex-col items-center justify-evenly ">
                <div className="text-8xl">Wypij wskazane kieliszki</div>
                <div className="flex flex-row">
                    {
                        penaltyGlassIds.map((x,i) => 
                                <div key={i} className="relative w-40 h-40 rounded-full border-2 overflow-hidden">
                                    <Image 
                                        className="object-cover w-full h-full"
                                        alt="Picture of the author"
                                        src={vodkaGlass}/>
                                    <div className="absolute w-full py-2.5 bottom-0 inset-x-0 bg-black text-white text-3xl font-bold text-center leading-4">{x}</div>

                                </div>
                        )
                    }
                </div>
                <button 
                    className="bg-green-500 hover:bg-green-700 text-5xl text-white font-bold py-16 px-36 rounded" 
                    onClick={() => setGameState(PenaltyGameStatus.Finished)}>
                        Powrót do gry
                </button>
            </div>
        )
    }

    return (
        <div className="p-10 bg-white h-full flex flex-row justify-around gap-10">
            <div className="flex flex-col justify-around item  items-center gap-10">
                <div>
                    { 
                        !showReadyTimer &&
                            <GameTimer
                                key={1}
                                paused={gameState != PenaltyGameStatus.Started} 
                                timeLimit={props.penalty.time}
                                onTimeLeft={() => setGameState(PenaltyGameStatus.Failed)}/>
                    }
                    { 
                        showReadyTimer &&
                        <div className="flex flex-col gap-10 mb-10">
                            <div className="text-center text-3xl font-bold mx-auto">Gdy licznik osiągnie zero przystąp do realizacji</div>
                            <GameTimer
                                key={1}
                                paused={gameState != PenaltyGameStatus.Prepairing} 
                                timeLimit={10} 
                                onTick={(timeLeft) => {
                                    if(timeLeft == 4)
                                        audioPlayer(Sounds.GO).play();

                                }}
                                onTimeLeft={() => setGameState(PenaltyGameStatus.Started)}/>
                        </div>
                    }
                </div>
                <div className="flex flex-col justify-center items-center gap-10">
                    {
                        gameState == PenaltyGameStatus.Waiting && 
                            <button 
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-16 px-36 rounded text-4xl w-full" 
                                onClick={() => setGameState(PenaltyGameStatus.Prepairing)}>
                                    Start
                            </button>
                    }
                    {
                        gameState == PenaltyGameStatus.Started && 
                            <button 
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-16 px-36 rounded text-4xl w-full" 
                                onClick={() => setGameState(PenaltyGameStatus.Passed)}>
                                    Ukończ
                            </button>
                    }
                    {
                        canResign &&
                        <button 
                            className="bg-slate-500 hover:bg-slate-800 text-white font-bold py-8 px-16 rounded text-4xl w-full" 
                            onClick={() => setGameState(PenaltyGameStatus.ChickenPenalty)}>
                                Jestem ciotą i wybieram karę
                        </button>
                    }
                </div>

            </div>
            <div className="text-5xl w-full bg-slate-300 flex flex-col items-center align-middle justify-center p-20">
                <div className="text-center leading-relaxed font-bold">
                    { showTaskText ?  props.penalty.text : "" }
                </div>
                {
                    gameState == PenaltyGameStatus.Passed && 
                        <div className={`py-5 text-green-500 leading-relaxed font-bold text-center text-8xl ${myFont.className}`}>
                            Mission passed!
                            Respect up
                        </div>
                }
                {
                    gameState == PenaltyGameStatus.Failed && 
                        <div className={`py-5 text-red-500 leading-relaxed font-bold text-center text-8xl ${myFont.className}`}>
                            Mission failed!
                            Respect down
                        </div>
                }
            </div>
        </div>
 
    );
};
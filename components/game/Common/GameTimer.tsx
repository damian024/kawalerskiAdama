import { useTimer } from "@/hooks/useTimer";
import { CircularProgress } from "./CircularProgress";
import { useEffect } from "react";

type GameTimerProps = {
    paused: boolean;
    timeLimit: number;
    disableColors?: boolean
    onTimeLeft?: () => void;
    onTick?: (timeLeft : number) => void;
};

function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        return `${minutes}:0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

const getColor = (progressPercentage: number)=>{
    if(progressPercentage > 0.2)
        return "text-green-500";
    if(progressPercentage > 0.1)
        return "text-orange-500";
    return "text-red-500";
}

export const GameTimer = (props: GameTimerProps) => {
    const timeLimit = props.timeLimit + 1
    const timeLeft = useTimer(timeLimit, props.paused);
    const timeLeftDecreased = Math.max(timeLeft - 1, 0)
    const progress = (timeLeftDecreased / Math.max(timeLimit-1, 0));
    const text = formatTime(timeLeftDecreased);
    const color = props.disableColors ? "text-slate-200" : getColor(progress);

    useEffect(() => {
        props.onTick?.(timeLeft);
        if(timeLeft == 0)
            props.onTimeLeft?.();
    },[timeLeft, props.onTick, props.onTimeLeft])
    return (
        <CircularProgress color={color} progress={progress} text={text} />
    );
};


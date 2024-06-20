import { useCallback, useEffect, useState } from "react";

export type PlayAudio = (src?: string) => void;
const play = async (audio: HTMLAudioElement, src: string = "") => {
    if (audio && !audio.paused) {
        audio.pause();
    }
    try{
        if(audio.src != src){
            audio.src = src;
        }
        audio.currentTime = 0;
        await audio.play();
    }
    catch(err){

    }
};

const pause = async (audio: HTMLAudioElement, src: string = "") => {
    if (audio && !audio.paused) {
        audio.pause();
    }
    try{
        audio.src = "";
        audio.currentTime = 0;
    }
    catch(err){

    }
};

export const useAudioPlayer = () => {
    const [audio] = useState<HTMLAudioElement>(() => new Audio());

    useEffect(() => {
        () => {
            if(!audio.paused)
                audio.pause();
        }
    })

    const playAudio = useCallback((src: string) => {
        play(audio, src);
    }, [audio]);

    const pauseAudio = useCallback(() => {
        pause(audio);
    }, [audio]);

    return [playAudio as PlayAudio, pauseAudio] as const;
};

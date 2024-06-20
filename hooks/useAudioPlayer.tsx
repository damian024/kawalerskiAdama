import { useEffect, useState } from "react";

export type AudioPlayerFactory = (src?: string) => HTMLAudioElement;
const getAudio = (audio: HTMLAudioElement, src: string = "") => {
    if (audio && !audio.paused) {
        audio.pause();
    }

    audio.src = src;
    audio.currentTime = 0;
    return audio;
};
export const useAudioPlayer = () => {
    const [audio] = useState<HTMLAudioElement>(() => new Audio());

    useEffect(() => {
        () => {
            if(!audio.paused)
                audio.pause();
        }
    })

    return (src?: string) => getAudio(audio, src);
};

import { useState, useEffect } from "react";

export const useTimer = (timeLimit: number, pause: boolean) => {
    const [timeLeft, setTimeLeft] = useState<number>(timeLimit);

    useEffect(()=> {
        if(pause)
            return;
        
        const interval = setInterval(() => {
            setTimeLeft(time => {
                if(time > 0)
                    return time - 1;
                clearInterval(interval);
                return 0;
            })
        }, 1000)
        return () => clearInterval(interval);
    }, [timeLimit, pause]);

    return timeLeft;
}
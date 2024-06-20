import { useCallback, useEffect, useState } from "react";

type MainMenuPageProps = {
    onGameStart: (loadGame : boolean) => void;
    clearSave: () => void;
};
export const MainMenuPage = (props : MainMenuPageProps) => {
    const [rerenderCount, forceRerender] = useForceRerender();
    const [saveExists, setSaveExists] = useState<boolean>(false);

    useEffect(() => {
        setSaveExists(!!localStorage.getItem("save"))
    },[rerenderCount])

    return (
        <div className="p-20 h-full flex flex-col items-center gap-10 bg-main bg-black bg-opacity-10 overflow-hidden">
            <div className="text-8xl font-bold basis-1/6 text-yellow-500 title-shadow text-center">
                <div>Postaw <br/>na <br/> miłość</div>
                <div className="text-red-500 text-5xl">Edycja biedna</div>
            </div>
            <div className="flex h-full flex-col basis-4/6 gap-5 w-full">
                <div className="flex h-full flex-row items-center w-1/4 justify-center bg-black bg-opacity-60 p-5 z-10">
                    <div className="flex flex-col gap-5">
                        <button 
                            className="bg-slate-100 hover:bg-slate-300 text-black font-bold py-8 px-20 rounded" 
                            onClick={() => props.onGameStart(false)}>
                                Nowa gra
                        </button>
                        {
                            saveExists &&
                            <>
                                <button 
                                    className="bg-slate-100 hover:bg-slate-300 text-black font-bold py-8 w-full rounded"
                                    onClick={() => {
                                        props.clearSave();
                                        forceRerender();
                                    }}>
                                        Usuń zapis
                                </button>
                                <button 
                                    className="bg-slate-100 hover:bg-slate-300 text-black font-bold py-8 w-full rounded" 
                                    onClick={() => props.onGameStart(true)}>
                                        Kontynuuj grę
                                </button>
                            </>
                        }
                    </div>
                    
                </div>
            </div>
        </div>
    )
};

const useForceRerender = () => {
    const [rerenderVal, setValue] = useState<number>(0);

    return [rerenderVal, useCallback(() => setValue(x => x+1),[setValue])] as const;
}

/*
Przyciski na
*/

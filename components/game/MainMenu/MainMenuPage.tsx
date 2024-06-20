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
        <div className="p-20 h-full flex flex-col items-center gap-10">
            <h1 className="text-8xl font-bold basis-1/6">Postaw na miłość</h1>
            <div className="flex h-full flex-col basis-4/6 gap-5 w-full">
                <div className="flex h-full flex-row items-center">
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
                                    className="bg-slate-100 hover:bg-slate-300 text-black font-bold py-8 px-20 rounded"
                                    onClick={() => {
                                        props.clearSave();
                                        forceRerender();
                                    }}>
                                        Usuń zapis
                                </button>
                                <button 
                                    className="bg-slate-100 hover:bg-slate-300 text-black font-bold py-8 px-16 rounded" 
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

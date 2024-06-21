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
        <div className="p-20 h-full flex flex-row items-center gap-10 bg-main bg-black bg-opacity-10 overflow-hidden">
            <div className="h-full flex flex-rowalign-bottom items-end justify-center font-bold basis-9/12">
                <div className="flex flex-col justify-center text-8xl text-yellow-500 text-center title-shadow ">
                    <div>Postaw <br/>na <br/> miłość</div>
                    <div className="text-red-500 text-5xl">Edycja biedna</div>
                </div>
            </div>
            <div className="flex h-full flex-col basis-3/12 gap-5 text-3xl">
                <div className="flex w-full h-full flex-row items-center justify-center bg-black bg-opacity-60 p-5 z-10">
                    <div className="w-full flex flex-col gap-20">
                        <button 
                            className="bg-slate-100 hover:bg-slate-300 text-black font-bold py-8 w-full rounded" 
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

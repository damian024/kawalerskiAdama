import { PenaltyConfig } from "@/common/configProvider";

type PenaltyListProps = {
    penalties: PenaltyConfig[];
    selectPenalty: (penaltyId: number) => void;
};
export const PenaltyList = (props: PenaltyListProps) => {
    console.log(props.penalties);
    return (
        <div className="h-full p-10 flex flex-col align-middle justify-space gap-10 bg-white">
            <h1 className="text-8xl text-center text-black">Wybór zadania</h1>
            <div className="mx-36 p-5 grid grid-cols-7 gap-7 text-black">
                {props.penalties.map((a, i) => (
                    <PenaltyBox key={i} penalty={a} index={i} penaltySelect={props.selectPenalty} />
                ))}
            </div>
        </div>
    );
};

type PenaltyBoxProps = {
    penalty: PenaltyConfig;
    index: number;
    penaltySelect: (index: number) => void;
};
const PenaltyBox = (props: PenaltyBoxProps) => {
    let {completed} = props.penalty;

    if(completed == null){
        return (
            <div className={`p-5 font-bold aspect-square border-cyan-800 border-8 bg-slate-300 hover:bg-yellow-200 flex items-center justify-center cursor-pointer`}
                onClick={() => props.penaltySelect(props.penalty.id)}>
                    <div className="text-8xl">{props.index + 1}</div>
            </div>
        );
    }

    let textColor = completed ? "text-green-500" : "text-red-500";
    return (
        <div className={`${textColor} p-5 font-bold aspect-square border-cyan-800 border-8 bg-slate-800 flex items-center justify-center cursor-default`}>
            <div className="text-8xl">{props.index + 1}</div>
        </div>
    );
};

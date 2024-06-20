import { QuestionConfig } from "@/common/configProvider";

type QuestionListProps = {
    questions: QuestionConfig[];
    selectQuestion: (index: number) => void;
};
export const QuestionsList = (props: QuestionListProps) => {
    return (
        <div className="h-full p-10 flex flex-col align-middle justify-space gap-10">
            <h1 className="text-8xl font-bold text-center text-black">Wybór pytania</h1>
            <div className="grid grid-cols-8 gap-7 text-black">
                {props.questions.map((a, i) => (
                    <QuestionSelectBox key={i} question={a} index={i} questionSelect={props.selectQuestion} />
                ))}
            </div>
        </div>
    );
};

type QuestionBoxProps = {
    question: QuestionConfig;
    index: number;
    questionSelect: (index: number) => void;
};
const QuestionSelectBox = (props: QuestionBoxProps) => {
    let {answeredCorrectly} = props.question;

    if(answeredCorrectly == null){
        return (
            <div className={`p-5 font-bold aspect-square border-cyan-800 border-8 bg-slate-300 hover:bg-yellow-200 flex items-center justify-center cursor-pointer`}
                onClick={() => props.questionSelect(props.question.id)}>
                    <div className="text-8xl">{props.index + 1}</div>
            </div>
        );
    }

    let textColor = answeredCorrectly ? "text-green-500" : "text-red-500";
    return (
        <div className={`${textColor} p-5 font-bold aspect-square border-cyan-800 border-8 bg-slate-800 flex items-center justify-center cursor-default`}>
            <div className="text-8xl">{props.index + 1}</div>
        </div>
    );
};
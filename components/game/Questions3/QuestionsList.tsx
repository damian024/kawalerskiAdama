import { QuestionConfig } from "@/common/configProvider";

type QuestionListProps = {
    questions: QuestionConfig[];
    selectQuestion: (index: number) => void;
};
export const QuestionsList = (props: QuestionListProps) => {
    return (
        <div className="h-full p-10 flex flex-col align-middle justify-space gap-10 bg-questions-list">
            <h1 className="text-8xl text-center text-white">Wybór pytania</h1>
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
            <div className={`p-5 aspect-square border-cyan-800 border-4 bg-yellow-200 hover:bg-yellow-300 flex items-center justify-center cursor-pointer`}
                onClick={() => props.questionSelect(props.question.id)}>
                    <div className="text-8xl">{props.index + 1}</div>
            </div>
        );
    }

    let textColor = answeredCorrectly ? "text-green-500" : "text-red-500";
    return (
        <div className={`p-5 aspect-square border ${textColor} border-cyan-800 border-4 text-3xl bg-slate-500 flex flex-col items-center justify-center cursor-not-allowed`}>
            <div className="text-8xl">{props.index + 1}</div>
        </div>
    );
};
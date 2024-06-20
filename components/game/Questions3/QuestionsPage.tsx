import { QuestionConfig } from "@/common/configProvider";
import { useState } from "react";
import { QuestionsList } from "./QuestionsList";
import { SelectedQuestion } from "./SelectedQuestion";

type QuestionsPageProps = {
    questions: QuestionConfig[];
    onTaskCompleted: (questionId: number, success: boolean) => void;
};

export const QuestionsPage = (props: QuestionsPageProps) => {
    const [selectedQuestion, setSelectedQuestion] = useState<QuestionConfig | undefined>(undefined);

    const onQuestionSelect = (questionId : number) => {
        setSelectedQuestion(props.questions.find(x => x.id == questionId));
    }

    const onQuestionCompleted = (correct: boolean) => {
        if(selectedQuestion == null)
            return;

        props.onTaskCompleted(selectedQuestion?.id, correct);
    }

    if(selectedQuestion != null)
        return <SelectedQuestion question={selectedQuestion} questionCompleted={onQuestionCompleted} />
    else
        return <QuestionsList questions={props.questions} selectQuestion={onQuestionSelect}/>
};



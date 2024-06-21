import { Config } from "@/common/configProvider"

export default function ResultsPage(){
    return <div className="flex text-xl flex-col gap-2">
        {
            Config.questions.map((x, i) =>
                <div key={i} 
                     className="flex flex-row gap-3 border-b-2">
                        <span>{i + 1}.</span>
                        <span className="text-green-700">{String.fromCharCode(65 + x.validAnswerIndex)}</span>
                </div>
            )
        }   
    </div>
} 
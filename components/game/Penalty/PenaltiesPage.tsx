import { PenaltyConfig } from "@/common/configProvider";
import { useState } from "react";
import { PenaltyList } from "./PenaltyList";
import { SelectedPenalty } from "./SelectedPenalty";

type PenaltyPageProps = {
    penalties: PenaltyConfig[];
    onTaskCompleted: (penaltyId: number, success: boolean) => void;
};

export const PenaltiesPage = (props: PenaltyPageProps) => {
    const [selectedPenalty, setSelectedPenalty] = useState<PenaltyConfig | undefined>(undefined);

    const onPenaltySelect = (penaltyId : number) => {
        setSelectedPenalty(props.penalties.find(x => x.id == penaltyId));
    }

    const onPenaltyCompleted = () => {
        if(selectedPenalty == null)
            return;

        props.onTaskCompleted(selectedPenalty?.id, true);
    }

    if(selectedPenalty != null)
        return <SelectedPenalty penalty={selectedPenalty} onCompleted={onPenaltyCompleted} />
    else
        return <PenaltyList penalties={props.penalties} selectPenalty={onPenaltySelect}/>
};

export const Config: GameConfig= {
    questions: [
        {
            id: 0,
            text : "Musisz wziąc z kosza na rekwizyty pistolet na wodę, napełnij go. Gdy będziesz gotowy kliknij start - twoim celem jest ustrzelenie minimum 5 osób",
            time: 10,
            validAnswerIndex: 2,
            answers: [
                "Odpowiedź 1",
                "Odpowiedź 2",
                "Odpowiedź 3",
            ]
        },
        {
            id: 1,
            text : "Musisz wziąc z kosza na rekwizyty pistolet na wodę, napełnij go. Gdy będziesz gotowy kliknij start - twoim celem jest ustrzelenie minimum 5 osób",
            time: 10,
            validAnswerIndex: 2,
            answers: [
                "Odpowiedź 2",
                "Odpowiedź 3",
                "Odpowiedź 4",
            ]
        },
    ],
    penalties: [
        {
            id: 0,
            text : "Musisz wziąc z kosza na rekwizyty pistolet na wodę, napełnij go. Gdy będziesz gotowy kliknij start - twoim celem jest ustrzelenie minimum 5 osób",
            time : 5,
        },
        {
            id: 1,
            text : "Kara 2",
            time : 60,
        },
        {
            id: 1,
            text : "Kara 2",
            time : 60,
        },
        {
            id: 0,
            text : "Musisz wziąc z kosza na rekwizyty pistolet na wodę, napełnij go. Gdy będziesz gotowy kliknij start - twoim celem jest ustrzelenie minimum 5 osób",
            time : 60,
        },
        {
            id: 1,
            text : "Kara 2",
            time : 60,
        },
        {
            id: 1,
            text : "Kara 2",
            time : 60,
        },
        {
            id: 0,
            text : "Musisz wziąc z kosza na rekwizyty pistolet na wodę, napełnij go. Gdy będziesz gotowy kliknij start - twoim celem jest ustrzelenie minimum 5 osób",
            time : 60,
        },
        {
            id: 1,
            text : "Kara 2",
            time : 60,
        },
        {
            id: 1,
            text : "Kara 2",
            time : 60,
        },
        {
            id: 0,
            text : "Musisz wziąc z kosza na rekwizyty pistolet na wodę, napełnij go. Gdy będziesz gotowy kliknij start - twoim celem jest ustrzelenie minimum 5 osób",
            time : 60,
        },
        {
            id: 1,
            text : "Kara 2",
            time : 60,
        },
        {
            id: 1,
            text : "Kara 2",
            time : 60,
        },
        {
            id: 0,
            text : "Musisz wziąc z kosza na rekwizyty pistolet na wodę, napełnij go. Gdy będziesz gotowy kliknij start - twoim celem jest ustrzelenie minimum 5 osób",
            time : 60,
        },
        {
            id: 1,
            text : "Kara 2",
            time : 60,
        },
        {
            id: 1,
            text : "Kara 2",
            time : 60,
        },
        {
            id: 0,
            text : "Musisz wziąc z kosza na rekwizyty pistolet na wodę, napełnij go. Gdy będziesz gotowy kliknij start - twoim celem jest ustrzelenie minimum 5 osób",
            time : 60,
        },
        {
            id: 1,
            text : "Kara 2",
            time : 60,
        },
        {
            id: 1,
            text : "Kara 2",
            time : 60,
        }

    ]
}

export type GameConfig ={
    questions : QuestionConfig[]
    penalties : PenaltyConfig[]
}

type TaskConfig = {
    id : number,
    text : string,
    time : number
}

export type PenaltyConfig = TaskConfig & {
    completed?: boolean,
}

export type QuestionConfig = TaskConfig & {
    validAnswerIndex: number,
    answers: string[]
    answeredCorrectly?: boolean
}
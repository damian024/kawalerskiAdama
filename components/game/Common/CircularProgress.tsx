type CircularProgressProps = {
    progress: number;
    text: string;
    color?: string;
};

export const CircularProgress = ({ progress, text, color }: CircularProgressProps) => {
    const radius = 40;
    const circumference = Number((2 * Math.PI * radius).toFixed(1));
    const strokeDashOffset = (circumference - (circumference * progress));

    return (
        <div className="flex justify-center items-center h-80 w-80 mx-auto">
            <svg viewBox="0 0 100 100">
                <circle
                    className="text-gray-200 stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent" />

                <circle
                    className={`${color} progress-ring__circle stroke-current`}
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={`${strokeDashOffset}px`} />
            </svg>
            <span className={`${color} text-8xl block absolute`}>{text}</span>
        </div>
    );
};

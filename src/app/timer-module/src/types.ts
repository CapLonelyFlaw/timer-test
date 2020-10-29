
export interface LapData {
    time: number;
    total: number;
    number: number;
}

export interface LapStopwatchData {
    laps?: LapData[];
    totalTimer?: StopwatchData;
    lapTimer?: StopwatchData;
}

export interface StopwatchData {
    startedTimestamp?: number;
    overallTime?: number;
    enabled?: boolean;
}

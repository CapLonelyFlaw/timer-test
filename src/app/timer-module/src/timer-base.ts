import { Observable } from 'rxjs';

import { LapData } from './types';

export abstract class TimerBase {
    abstract get time(): number;
    abstract get isRunning(): boolean;
    abstract get isDirty(): boolean;
    abstract get started(): Observable<boolean>;

    abstract start(): void;
    abstract stop(): void;
    abstract toJson(): any;
}

export abstract class StopwatchBase extends TimerBase {
    abstract get laps(): LapData[];
    abstract get started(): Observable<boolean>;
    abstract get lapAdded(): Observable<LapData>;
    abstract get cleared(): Observable<void>;
    abstract get totalTimer(): TimerBase;
    abstract get lapTimer(): TimerBase;
    abstract get lapNumber(): number;

    abstract lap(): void;
    abstract clear(): void;
}

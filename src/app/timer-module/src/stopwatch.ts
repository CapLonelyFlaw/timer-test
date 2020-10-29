import { Observable, Subject } from 'rxjs';

import { Timer } from './timer';
import { StopwatchBase, TimerBase } from './timer-base';
import { DummyTimer } from './timer-dummy';
import { LapData, LapStopwatchData } from './types';

export class Stopwatch extends StopwatchBase {

    get time(): number {
        return this.totalTimerBase.time;
    }

    get totalTimer(): TimerBase {
        return this.totalTimerBase;
    }

    get lapTimer(): TimerBase {
        return this.lapTimerBase;
    }

    get lapNumber(): number {
        return this.laps.length + 1;
    }

    get isRunning(): boolean {
        return this.totalTimerBase.isRunning;
    }

    get isDirty(): boolean {
        return this.totalTimerBase.isDirty;
    }

    private startedSub = new Subject<boolean>();
    get started(): Observable<boolean> {
        return this.startedSub.asObservable();
    }

    private lapAddedSub = new Subject<LapData>();
    get lapAdded(): Observable<LapData> {
        return this.lapAddedSub.asObservable();
    }

    private clearedSub = new Subject<void>();
    get cleared(): Observable<void> {
        return this.clearedSub.asObservable();
    }

    laps: LapData[];

    private totalTimerBase: TimerBase;
    private lapTimerBase: TimerBase;

    constructor(init: LapStopwatchData = {}) {
        super();
        this.totalTimerBase = new Timer(init.totalTimer);
        this.lapTimerBase = init.lapTimer ? new Timer(init.lapTimer) : new DummyTimer();
        this.laps = init.laps || [];
    }

    start(): void {
        this.totalTimerBase.start();
        this.lapTimerBase.start();
        this.startedSub.next(true);
    }

    stop(): void {
        this.totalTimerBase.stop();
        this.lapTimerBase.stop();
        this.startedSub.next(false);
    }

    clear(): void {
        this.totalTimerBase = new Timer();
        this.lapTimerBase = new DummyTimer();
        this.laps = [];
        this.clearedSub.next();
    }

    lap(): void {
        const lap = {
            number: this.laps.length + 1,
            total: this.totalTimerBase.time,
            time: this.lapTimerBase instanceof DummyTimer ?
                this.totalTimerBase.time : this.lapTimerBase.time
        };
        this.laps.unshift(lap);
        this.lapTimerBase = new Timer();
        this.lapTimerBase.start();
        this.lapAddedSub.next(lap);
    }

    toJson(): LapStopwatchData {
        return {
            laps: this.laps,
            totalTimer: this.totalTimer.toJson(),
            lapTimer: this.lapTimer.toJson()
        };
    }
}

import { BehaviorSubject, Observable } from 'rxjs';

import { TimerBase } from './timer-base';
import { StopwatchData } from './types';

export class Timer extends TimerBase {

    get time(): number {
        if (!this.startTimestamp) {
            return 0;
        }
        if (this.isRunning) {
            return this.overallTime + this.timeSinceLastStart();
        }
        return this.overallTime;
    }

    get isRunning(): boolean {
        return this.enabled;
    }

    get isDirty(): boolean {
        return this.overallTime !== 0;
    }

    private startedSub: BehaviorSubject<boolean>;
    get started(): Observable<boolean> {
        return this.startedSub.asObservable();
    }

    private startTimestamp: number;
    private overallTime: number;
    private enabled: boolean;

    constructor(init: StopwatchData = {}) {
        super();
        this.startTimestamp = init.startedTimestamp || 0;
        this.overallTime = init.overallTime || 0;
        this.enabled = init.enabled;
        this.startedSub = new BehaviorSubject<boolean>(init.enabled);
    }

    start(): void {
        if (this.enabled) {
            return;
        }
        this.startTimestamp = Date.now();
        this.enabled = true;
        this.startedSub.next(true);
    }

    private timeSinceLastStart(): number {
        if (!this.startTimestamp) {
            return 0;
        }
        return Date.now() - this.startTimestamp;
    }

    stop(): void {
        if (!this.enabled) {
            return;
        }
        this.enabled = false;
        this.overallTime = this.overallTime + this.timeSinceLastStart();
        this.startedSub.next(false);
    }

    toJson(): any {
        return {
            startedTimestamp: this.startTimestamp,
            overallTime: this.overallTime,
            enabled: this.enabled,
        };
    }
}

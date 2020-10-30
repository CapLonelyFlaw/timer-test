import { Observable, of } from 'rxjs';

import { TimerBase } from './timer-base';

export class DummyTimer extends TimerBase {

    time = 0;

    get isRunning(): boolean {
        return false;
    }

    get isDirty(): boolean {
        return false;
    }

    get started(): Observable<boolean> {
        return of(false);
    }

    start(): void {
    }

    stop(): void {
    }

    clear(): void {
    }

    toJson(): any {
        return null;
    }
}

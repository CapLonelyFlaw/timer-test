import { Injectable } from '@angular/core';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';

import { Stopwatch } from '../src/stopwatch';
import { StopwatchBase } from '../src/timer-base';

@Injectable()
export class StopwatchService {

    createStopwatch(): StopwatchBase {
        return new Stopwatch();
    }

    restoreStopwatch(): StopwatchBase {
        const timerData = JSON.parse(window.localStorage.getItem('mainStopwatch'));
        return new Stopwatch(timerData || {});
    }

    // return observable so we can sync stopwatch or not if needed
    tabSync(stopwatch: StopwatchBase): Observable<StopwatchBase> {
        return new Observable((s) => {
            let swChangesSub = new Subscription();
            let justUpdated = false;
            const observeStopwatch = () => {
                swChangesSub.unsubscribe();
                swChangesSub = merge(stopwatch.started, stopwatch.lapAdded, stopwatch.cleared, 3)
                    .subscribe(() => {
                        localStorage.setItem('mainStopwatch', JSON.stringify(stopwatch.toJson()));
                        justUpdated = true;
                    });
            };
            observeStopwatch();
            const storageSub = fromEvent(window, 'storage')
                .subscribe(() => {
                    if (justUpdated) {
                        justUpdated = false;
                        return;
                    }
                    const timerData = JSON.parse(window.localStorage.getItem('mainStopwatch'));
                    stopwatch = new Stopwatch(timerData || {});
                    observeStopwatch();
                    s.next(stopwatch);
                });
            // teardown
            return () => {
                swChangesSub.unsubscribe();
                storageSub.unsubscribe();
            };
        });
    }
}

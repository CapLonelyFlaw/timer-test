import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    SimpleChanges,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { TimerBase } from '../../src//timer-base';
import { DummyTimer } from '../../src/timer-dummy';

@Component({
    selector: 'app-digital-timer',
    template: `
        {{timer.time | date:'mm:ss.SS'}}
    `,
    styleUrls: ['digital-timer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigitalTimerComponent implements OnChanges, OnDestroy {

    @Input()
    timer: TimerBase = new DummyTimer();

    private timerSub = new Subscription();
    private interval = new Subscription();

    constructor(private chRef: ChangeDetectorRef, private zone: NgZone){
    }

    ngOnDestroy(): void {
        this.timerSub.unsubscribe();
        this.interval.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.timer && this.timer) {
            this.timerSub.unsubscribe();
            this.timerSub = this.timer.started.subscribe((enabled) => {
                if (enabled) {
                    this.zone.runOutsideAngular(() => {
                        this.interval = interval(30).subscribe(() => {
                            this.chRef.detectChanges();
                        });
                    });
                } else {
                    this.chRef.detectChanges();
                    this.interval.unsubscribe();
                }
            });
        }
    }
}

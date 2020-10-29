import { Component, Input } from '@angular/core';

import { Stopwatch } from '../../src/stopwatch';
import { StopwatchBase } from '../../src/timer-base';

@Component({
    selector: 'app-digital-stopwatch',
    template: `
        <app-digital-timer class="font-24" [timer]="timer.totalTimer"></app-digital-timer>
        <div class="current-lap" [ngClass]="timer.lapNumber > 1 ? 'active' : ''">
            <app-digital-timer class="font-20" [timer]="timer.lapTimer"></app-digital-timer>
            <span [attr.inv]="timer.lapNumber <= 1">lap {{timer.lapNumber}}</span>
        </div>

        <ng-container *ngIf="timer.isRunning; else startRef">
        <button (click)="timer.lap()">LAP</button>
        <button (click)="timer.stop()">STOP</button>
        </ng-container>
        <ng-template #startRef>
        <button (click)="timer.clear()" [disabled]="!timer.isDirty">RESET</button>
        <button (click)="timer.start()">START</button>
        </ng-template>

        <div class="history" *ngIf="timer.laps.length">
            <span class="lap">LAP</span>
            <span class="time">TIME</span>
            <span class="time">TOTAL TIME</span>
            <ng-container *ngFor="let lap of timer.laps">
                <span class="lap">{{lap.number}}</span>
                <span class="time">{{lap.time | date:'mm:ss.SS'}}</span>
                <span class="time">{{lap.total | date:'mm:ss.SS'}}</span>
            </ng-container>
        </div>
    `,
    styleUrls: ['digital-stopwatch.component.scss']
})
export class DigitalStopwatchComponent {
    @Input()
    timer: StopwatchBase = new Stopwatch();
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DigitalStopwatchComponent } from './components/digital-stopwatch/digital-stopwatch.component';
import { DigitalTimerComponent } from './components/digital-timer/digital-timer.component';
import { StopwatchService } from './services/stopwatch.service';

const exportedDeclarations = [
    DigitalTimerComponent,
    DigitalStopwatchComponent
];

@NgModule({
    declarations: [
        ...exportedDeclarations
    ],
    providers: [
        StopwatchService
    ],
    exports: [
        ...exportedDeclarations
    ],
    imports: [CommonModule]
})
export class TimerModule {

}

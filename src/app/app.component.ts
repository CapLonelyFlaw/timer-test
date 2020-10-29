import { Component } from '@angular/core';

import { StopwatchService, StopwatchBase } from 'src/app/timer-module';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    timer: StopwatchBase;

    constructor(stopwatchService: StopwatchService) {
        this.timer = stopwatchService.createStopwatch();
        stopwatchService.tabSync(this.timer).subscribe((timer) => {
            this.timer = timer;
        });
    }
}

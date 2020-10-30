import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { StopwatchBase, StopwatchService } from 'src/app/timer-module';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    timer: StopwatchBase;

    get isFullscreenSupported(): boolean {
        return this.document.documentElement.requestFullscreen !== undefined;
    }

    get isFullscreen(): boolean {
        return this.fullScreen;
    }
    private fullScreen: boolean;

    constructor(stopwatchService: StopwatchService,
                @Inject(DOCUMENT) private document: HTMLDocument) {
        this.timer = stopwatchService.createStopwatch();
        stopwatchService.tabSync(this.timer).subscribe((timer) => {
            this.timer = timer;
        });
    }

    toggleFullscreen(): void {
        if (!this.document.fullscreenElement) {
            this.document.documentElement.requestFullscreen();
            this.fullScreen = true;
        } else {
            this.document.exitFullscreen();
            this.fullScreen = false;
        }
      }
}

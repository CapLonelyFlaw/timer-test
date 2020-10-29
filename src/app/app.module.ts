import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TimerModule } from 'src/app/timer-module/timer.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TimerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

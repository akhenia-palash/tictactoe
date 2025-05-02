import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component'; // <-- Import GameComponent

@NgModule({
  declarations: [
    AppComponent,
    GameComponent // <-- Declare GameComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent] // <-- Bootstrap AppComponent
})
export class AppModule { }

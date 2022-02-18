import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { BoardComponent } from './board/board.component';
import { DragulaModule } from 'ng2-dragula';
import { GameComponent } from './game/game.component';
import { PlayingCardsComponent } from './playing-cards/playing-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BoardComponent,
    GameComponent,
    PlayingCardsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    DragulaModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { GameComponent } from './game/game.component';
import { MainComponent } from './main/main.component';
import { PlayingCardsComponent } from './playing-cards/playing-cards.component';

const routes: Routes = [
  { path: '', component:MainComponent },
  { path: 'board/:id', component:BoardComponent},
  { path: 'game', component:GameComponent},
  { path: 'cards', component:PlayingCardsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

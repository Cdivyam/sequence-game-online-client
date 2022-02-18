import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-playing-cards',
  templateUrl: './playing-cards.component.html',
  styleUrls: ['./playing-cards.component.scss']
})
export class PlayingCardsComponent implements OnInit {

  @Input() choosen_card: any = 'ace_spades';
  @Input() isPlayerCards: boolean = false;
  @Input() chipColor: string = 'indigo';
  @Input() show_chip:boolean = false;
  @Output() cardClick = new EventEmitter;

  cardDetails : any;
  card_name:any;
  playerCards:any;

  username:any;
  teamsList:any;
  turnList:any;
  currentTurnIndex:number;

  constructor() {
    this.username = localStorage.getItem("myUsername");
    this.teamsList = JSON.parse(localStorage.getItem("teamList") || '0');
    this.turnList = JSON.parse(localStorage.getItem("turnList")||'0');
    this.currentTurnIndex = parseInt(localStorage.getItem("currentTurnIndex") || '0');
  }

  ngOnInit(): void {
    // console.log("isPlayerCards", this.isPlayerCards)
    this.card_name = this.choosen_card.split('-')[0];
    this.cardDetails={
      ace_clubs: { number: "A", color: "clubs" },
      ace_spades: { number: "A", color: "spades" },
      ace_hearts: { number: "A", color: "hearts" },
      ace_diamonds: { number: "A", color: "diamonds" },
      two_clubs: { number: "2", color: "clubs" },
      two_spades: { number: "2", color: "spades" },
      two_hearts: { number: "2", color: "hearts" },
      two_diamonds: { number: "2", color: "diamonds" },
      three_clubs: { number: "3", color: "clubs" },
      three_spades: { number: "3", color: "spades" },
      three_hearts: { number: "3", color: "hearts" },
      three_diamonds: { number: "3", color: "diamonds" },
      four_clubs: { number: "4", color: "clubs" },
      four_spades: { number: "4", color: "spades" },
      four_hearts: { number: "4", color: "hearts" },
      four_diamonds: { number: "4", color: "diamonds" },
      five_clubs: { number: "5", color: "clubs" },
      five_spades: { number: "5", color: "spades" },
      five_hearts: { number: "5", color: "hearts" },
      five_diamonds: { number: "5", color: "diamonds" },
      six_clubs: { number: "6", color: "clubs" },
      six_spades: { number: "6", color: "spades" },
      six_hearts: { number: "6", color: "hearts" },
      six_diamonds: { number: "6", color: "diamonds" },
      seven_clubs: { number: "7", color: "clubs" },
      seven_spades: { number: "7", color: "spades" },
      seven_hearts: { number: "7", color: "hearts" },
      seven_diamonds: { number: "7", color: "diamonds" },
      eight_clubs: { number: "8", color: "clubs" },
      eight_spades: { number: "8", color: "spades" },
      eight_hearts: { number: "8", color: "hearts" },
      eight_diamonds: { number: "8", color: "diamonds" },
      nine_clubs: { number: "9", color: "clubs" },
      nine_spades: { number: "9", color: "spades" },
      nine_hearts: { number: "9", color: "hearts" },
      nine_diamonds: { number: "9", color: "diamonds" },
      ten_clubs: { number: "10", color: "clubs" },
      ten_spades: { number: "10", color: "spades" },
      ten_hearts: { number: "10", color: "hearts" },
      ten_diamonds: { number: "10", color: "diamonds" },
      jack_clubs: { number: "J", color: "clubs" },
      jack_spades: { number: "J", color: "spades" },
      jack_hearts: { number: "J", color: "hearts" },
      jack_diamonds: { number: "J", color: "diamonds" },
      queen_clubs: { number: "Q", color: "clubs" },
      queen_spades: { number: "Q", color: "spades" },
      queen_hearts: { number: "Q", color: "hearts" },
      queen_diamonds: { number: "Q", color: "diamonds" },
      king_clubs: { number: "K", color: "clubs" },
      king_spades: { number: "K", color: "spades" },
      king_hearts: { number: "K", color: "hearts" },
      king_diamonds: { number: "K", color: "diamonds" },
      joker: {number: "*", color: "back"}
    }
    // console.log(Object.keys(this.cardDetails));
    // this.shufflePack();
  }
  sendCardName(){
    if(this.card_name !== 'joker' && this.turnList[this.currentTurnIndex]===this.username){
      this.show_chip = true;
      this.cardClick.emit({choosen_card: this.choosen_card, card_name: this.card_name});
    }
  }
}

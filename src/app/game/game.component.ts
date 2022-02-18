import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  boardLayout : any;
  roomId:string | null;
  username:any;
  teamsList:any;
  teamRed:any;
  teamGreen:any;
  teamBlue:any;
  playersList:any;
  playerCards:any;
  turnList:any;
  timeOut:number;
  currentTurnIndex:number;
  currentTimer:any;
  isPlayerCards:boolean = false;

  constructor(private router:Router,
    private webSocketService: WebSocketService
    ) { 
    this.roomId = localStorage.getItem("roomId");
    this.username = localStorage.getItem("myUsername");
    this.teamsList = JSON.parse(localStorage.getItem("teamList") || '0');
    this.teamRed = JSON.parse(localStorage.getItem("teamRed") || '0');
    this.teamGreen = JSON.parse(localStorage.getItem("teamGreen") || '0');
    this.teamBlue = JSON.parse(localStorage.getItem("teamBlue") || '0');
    this.playersList = JSON.parse(localStorage.getItem("playersList") || '0');
    this.playerCards = JSON.parse(localStorage.getItem("playerCards")||'0');
    this.turnList = JSON.parse(localStorage.getItem("turnList")||'0');
    this.timeOut = parseInt(localStorage.getItem("timeOut") || '300');
    this.currentTurnIndex = parseInt(localStorage.getItem("currentTurnIndex") || '0');
    // if(this.username === null || this.roomId === null){
    //   this.router.navigate(['/']);
    // }


    // Dummy Values
    // this.roomId = 'nNzO5k-okDxCk';
    // this.username = 'abc';
    // this.teamsList = {"abc":{"team":"red","socketId":"xPZhUDYkNR7CBmtRAAAB","isAdmin":true},"ddd":{"team":"red","socketId":"Mpv69c8YbiJZ4YOOAAAF","isAdmin":false}};
    // this.teamRed = ["ddd"];
    // this.teamBlue = [];
    // this.teamGreen = ["abc"];
    // this.playersList = {"playersList":[]};
    // this.playerCards = ['three_clubs','four_clubs', 'five_clubs', 'six_clubs', 'seven_clubs','eight_clubs','nine_clubs'];
    // this.turnList = ["ddd","abc"];
    // this.timeOut = 300
    // this.currentTurnIndex = 0;
  }

  ngOnInit(): void {
    
    this.boardLayout = [
      ['joker-00', 'ten_spades-01', 'queen_spades-02', 'king_spades-03', 'ace_spades-04', 'two_diamonds-05', 'three_diamonds-06', 'four_diamonds-07', 'five_diamonds-08', 'joker-09'],
      ['nine_spades-10', 'ten_hearts-11', 'nine_hearts-12', 'eight_hearts-13', 'seven_hearts-14', 'six_hearts-15', 'five_hearts-16', 'four_hearts-17', 'three_hearts-18', 'six_diamonds-19'],
      ['eight_spades-20', 'queen_diamonds-21', 'seven_diamonds-22', 'eight_diamonds-23', 'nine_diamonds-24', 'ten_diamonds-25', 'queen_diamonds-26', 'king_diamonds-27', 'two_hearts-28', 'seven_hearts-29'],
      ['seven_spades-30', 'king_hearts-31','six_diamonds-32', 'two_clubs-33', 'ace_hearts-34', 'king_hearts-35', 'queen_hearts-36', 'ace_diamonds-37', 'two_spades-38', 'eight_diamonds-39'],
      ['six_spades-40', 'ace_hearts-41', 'five_diamonds-42', 'three_clubs-43', 'four_hearts-44', 'three_hearts-45', 'ten_hearts-46', 'ace_clubs-47', 'three_spades-48', 'nine_diamonds-49'],
      ['five_spades-50', 'two_clubs-51', 'four_diamonds-52', 'four_clubs-53', 'five_hearts-54', 'two_hearts-55', 'nine_hearts-56', 'king_clubs-57', 'four_spades-58', 'ten_diamonds-59'],
      ['four_spades-60', 'three_clubs-61', 'three_diamonds-62', 'five_clubs-63', 'six_hearts-64', 'seven_hearts-65', 'eight_hearts-66', 'queen_clubs-67', 'five_clubs-68', 'queen_diamonds-69'],
      ['three_spades-70', 'four_clubs-71', 'two_diamonds-72', 'six_clubs-73', 'seven_clubs-74', 'nine_clubs-75', 'nine_clubs-76', 'ten_clubs-77', 'six_spades-78', 'king_diamonds-79'],
      ['two_spades-80', 'five_clubs-81', 'ace_spades-82', 'king_spades-83', 'queen_spades-84', 'ten_spades-85', 'nine_spades-86', 'eight_spades-87', 'seven_spades-88', 'ace_diamonds-89'],
      ['joker-90', 'six_clubs-91', 'seven_clubs-92', 'eight_clubs-93', 'nine_clubs-94', 'ten_clubs-95', 'queen_clubs-96', 'king_clubs-97', 'ace_clubs-98','joker-99']
    ];
    // this.boardLayout = [
    //   ['joker-00', 'ten_spades-01', 'queen_spades-02', 'king_spades-03', 'ace_spades-04', 'two_diamonds-05', 'three_diamonds-06', 'four_diamonds-07', 'five_diamonds-08', 'joker-09'],
    // ]
  }
  // positionPlayerCard(val:any){
  //   let pos = (6.5 - 2.25*(val)).toString().replace('.', '-');
  //   return 'left-'+pos + 'rem';
  // }
  getTeamBGColor(val:string){
    // console.log('bg-'+this.teamsList[val].team+'-500')
    return 'bg-'+this.teamsList[val].team+'-500';
  }
  getTeamChipColor(){
    return this.teamsList[this.username].team;
  }
  cardClick(e:Event){
    console.log(e);
    if(this.turnList[this.currentTurnIndex]===this.username){
      this.webSocketService.emit("card click", e)
    }
  }
}

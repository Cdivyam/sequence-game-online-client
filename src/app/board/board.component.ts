import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, RouterPreloader } from '@angular/router';
import { WebSocketService } from '../services/web-socket.service';
import { DragulaService } from "ng2-dragula";
import { Subscription } from "rxjs";
// import { browserRefresh } from '../app.component';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  username = localStorage.getItem('myUsername') || '';
  isCreator:any = localStorage.getItem('isCreator') || '';
  timeOut:any;
  isUsernameSet:boolean=true;
  isGameStart:boolean=false;
  playersList:any=[];
  teamList:any=JSON.parse(localStorage.getItem("teamList")|| '0');
  roomId: any;
  gameLink:any;
  teamRed:any = [];
  teamGreen:any = [];
  teamBlue:any = [];
  PLAYERS = 'PLAYERS';
  isPlayerReady:boolean=false;
  playerReadyList:any=[];
  subs = new Subscription();
  draggable:boolean=true;
  timeOutVals = [
    { name: '30 sec', value:30},
    { name: '60 sec', value:60},
    { name: '120 sec', value:120},
    { name: '150 sec', value:150},
    { name: '180 sec', value:180},
    { name: '240 sec', value:240},
    { name: '300 sec', value:300},
  ]
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private webSocketService: WebSocketService,
    private dragulaService: DragulaService
  ) {
    console.log(this.teamList);
   }

  ngOnInit(): void {
    console.log("----1----");
    // Clear memory if current roomId does not equal the one in local storage
    let r:any =this.activeRoute.snapshot.paramMap.get('id');    
    if(r!==localStorage.getItem('roomId')) localStorage.removeItem('myUsername');

    // Set Game Link
    this.gameLink = 'localhost:4200/board/'+r;

    // Check if user is creator of the game room
    if(this.isCreator === 'true'){
      this.isCreator = true;
    }
    else this.isCreator = false;

    // If username is already set then no need to take the username again.
    // Take username if it is not set
    if(!this.username){
      console.log("----2----");
      this.isUsernameSet = false;
    } else{
      console.log("----3----");
      this.playersList = JSON.parse(localStorage.getItem('playersList') || '').playersList;

      /***********Reload Logic->Remove player*************/
      if(this.teamList[this.username].hasOwnProperty('socketId')){
        localStorage.clear();
        this.router.navigate(['/']);
      }
    }
    this.roomId = this.activeRoute.snapshot.paramMap.get('id');
    localStorage.setItem('roomId', this.roomId);

    // If player joins room let all players know it
    this.webSocketService.listen("new player").subscribe(async(data:any)=>{
      // console.log(data);
      console.log("----4----");
      if(data[1] !== this.username) this.playersList.push(data[1]);
      else{
        Object.keys(data[0]).forEach((element:any) => {
          this.playersList.push(element);
        });
      }
      this.teamList = data[0];
      // console.log(this.teamList);
      this.teamBlue = [];
      this.teamRed = [];
      this.teamGreen = [];
      this.playersList = [];
      await Object.keys(this.teamList).forEach(k=>{
        switch(this.teamList[k].team){
          case 'red':
            this.teamRed.push(k);
            break;
          case 'green':
            this.teamGreen.push(k);
            break;
          case 'indigo':
            this.teamBlue.push(k);
            break;
          default:
            this.playersList.push(k);
            break;
        }
      });    
      localStorage.setItem('teamList', JSON.stringify(this.teamList));
      localStorage.setItem('teamRed', JSON.stringify(this.teamRed));
      localStorage.setItem('teamBlue', JSON.stringify(this.teamBlue));
      localStorage.setItem('teamGreen', JSON.stringify(this.teamGreen));
      localStorage.setItem('playersList', JSON.stringify({playersList: this.playersList}));
    });

    // dragula dropModel Service used for changing teams
    this.subs.add(this.dragulaService.dropModel(this.PLAYERS)
      .subscribe(async({ el, target, source, sourceModel, targetModel, item }) => {

        let sourceTeamName = source.classList[5].split('-')[1];
        let targetTeamName = target.classList[5].split('-')[1];
        // console.log("teamList: ", this.teamList)
        if(targetTeamName!=='slate'){
          this.teamList[item].team = targetTeamName;
        } else {
          this.teamList[item].team = '';
        }
        this.webSocketService.emit("team change", [this.roomId, item, targetTeamName, sourceTeamName]);
        this.teamBlue = [];
        this.teamRed = [];
        this.teamGreen = [];
        this.playersList = [];
        await Object.keys(this.teamList).forEach(k=>{
          switch(this.teamList[k].team){
            case 'red':
              this.teamRed.push(k);
              break;
            case 'green':
              this.teamGreen.push(k);
              break;
            case 'indigo':
              this.teamBlue.push(k);
              break;
            default:
              this.playersList.push(k);
              break;
          }
        });    
        localStorage.setItem('teamList', JSON.stringify(this.teamList));
        localStorage.setItem('teamRed', JSON.stringify(this.teamRed));
        localStorage.setItem('teamBlue', JSON.stringify(this.teamBlue));
        localStorage.setItem('teamGreen', JSON.stringify(this.teamGreen));
      })
    );

    // Check for team change events
    // Make changes if and only if username not same as the data[0]
    this.webSocketService.listen("teamChangeEvent").subscribe( async (data:any)=>{
      this.teamList[data[0]].team = data[1];
      // console.log(this.teamList)
      console.log("----5----");
      
      this.teamBlue = [];
      this.teamRed = [];
      this.teamGreen = [];
      this.playersList = [];
      await Object.keys(this.teamList).forEach(k=>{
        switch(this.teamList[k].team){
          case 'red':
            this.teamRed.push(k);
            break;
          case 'green':
            this.teamGreen.push(k);
            break;
          case 'indigo':
            this.teamBlue.push(k);
            break;
          default:
            this.playersList.push(k);
            break;
        }
      });
      localStorage.setItem('teamList', JSON.stringify(this.teamList));
      localStorage.setItem('teamRed', JSON.stringify(this.teamRed));
      localStorage.setItem('teamBlue', JSON.stringify(this.teamBlue));
      localStorage.setItem('teamGreen', JSON.stringify(this.teamGreen));
      localStorage.setItem('playersList', JSON.stringify({playersList: this.playersList}));
    });

    // When a player disconnects
    this.webSocketService.listen("player disconnected").subscribe(async(data:any)=>{
      console.log("----6----");
      delete this.teamList[data[1]];
      this.teamBlue = [];
      this.teamRed = [];
      this.teamGreen = [];
      this.playersList = [];
      await Object.keys(this.teamList).forEach(k=>{
        switch(this.teamList[k].team){
          case 'red':
            this.teamRed.push(k);
            break;
          case 'green':
            this.teamGreen.push(k);
            break;
          case 'indigo':
            this.teamBlue.push(k);
            break;
          default:
            this.playersList.push(k);
            break;
        }
      });
      localStorage.setItem('teamList', JSON.stringify(this.teamList));
      localStorage.setItem('teamRed', JSON.stringify(this.teamRed));
      localStorage.setItem('teamBlue', JSON.stringify(this.teamBlue));
      localStorage.setItem('teamGreen', JSON.stringify(this.teamGreen));
      localStorage.setItem('playersList', JSON.stringify({playersList: this.playersList}));
    });

    this.webSocketService.listen("player ready").subscribe(async(data:any)=>{
      this.playerReadyList = [];
      await data.forEach((e:any) => {
        this.playerReadyList.push(e);
      });
    });

    this.webSocketService.listen("player cards").subscribe((playerCards:any)=>{
      localStorage.setItem("playerCards", JSON.stringify(playerCards));
    });

    this.webSocketService.listen("timeOut and turns").subscribe((data:any)=>{
      localStorage.setItem("turnList", JSON.stringify(data.turnList));
      localStorage.setItem("timeOut", data.timeOut);
      localStorage.setItem("currentTurnIndex", data.currentTurnIndex);
    });

    this.webSocketService.listen("All Ready").subscribe((data:any)=>{
      this.isGameStart = true;
      // this.router.navigate(['game']);
    });
  }

  /**
   * joinRoom to join a particular room
   * Username is set to true here, variables sored in localstorage
   * 'join room' emitted to let other players in the same room know
   */
  joinRoom(){
    this.isUsernameSet = true;
    localStorage.setItem('myUsername', this.username);
    localStorage.setItem('isCreator', 'false');
    this.webSocketService.emit("join room", {roomId: this.roomId, username: this.username});
  }

  copyLink(){
    navigator.clipboard.writeText(this.gameLink);
  }

  playerReady(){
    if(this.teamList[this.username].team==='') return;
    this.isPlayerReady = true;
    this.draggable = false;
    this.playerReadyList.push(this.username);
    console.log("this.isCreator: ", this.isCreator, typeof this.isCreator);
    if(this.isCreator === 'true' || this.isCreator === true){
      localStorage.setItem('timeOut', this.timeOut);
      this.webSocketService.emit("player ready", {
        roomId:this.roomId, 
        username: this.username, 
        timeOut: parseInt(this.timeOut.split(' ')[0]),
        teamRed: this.teamRed,
        teamBlue: this.teamBlue,
        teamGreen: this.teamGreen
      });
    } else{
      this.webSocketService.emit("player ready", {
        roomId:this.roomId, 
        username: this.username
      });
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}

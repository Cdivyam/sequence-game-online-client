import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  username:any;
  isCreator:boolean=false;
  constructor(
    private webSocketService: WebSocketService,
    private router: Router
  ) { 
    localStorage.clear();
  }

  ngOnInit(): void {
    this.webSocketService.listen("room id").subscribe((data:any)=>{
      localStorage.setItem('roomId', data);
      localStorage.setItem('isCreator', 'true');
      this.router.navigate(['/board', data]);
    });
  }

  createRoom(){
    localStorage.setItem('myUsername', this.username);
    this.webSocketService.emit("create room", this.username);
    localStorage.setItem('playersList', JSON.stringify({playersList: [this.username]}));
    localStorage.setItem('teamList', JSON.stringify({[this.username]: {team:""}}))
    // localStorage.setItem('timeout', new Date().getTime().toString());
    this.username = '';
  }
}

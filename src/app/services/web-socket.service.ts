import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket: any;
  // readonly uri: string = "ws://192.168.0.104:3000";
  readonly uri: string = "ws://localhost:3000";
  constructor() { 
    this.socket = io(this.uri, {
      withCredentials: false,
    });
  }

  listen(eventName: String){
    return new Observable((subscriber)=>{
      this.socket.on(eventName, (data:any)=>{
        subscriber.next(data);
      })
    })
  }

  emit(eventName: String, data:any){
    this.socket.emit(eventName, data)
  }

  newConnection(route: String){
    this.socket = io(this.uri+'/'+route, {
      withCredentials: false,
    });
  }
}

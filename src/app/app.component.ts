import { Component, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
// export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'client';
  // navSubscription: Subscription;
  // constructor(private router: Router){
  //   this.navSubscription = router.events.subscribe((e)=>{
  //     if(e instanceof NavigationStart){
  //       browserRefresh = !router.navigated;
  //     }
  //   })
  // }

  // ngOnDestroy() {
  //   this.navSubscription.unsubscribe();
  // }
}

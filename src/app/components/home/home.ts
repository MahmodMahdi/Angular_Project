import { Component, OnDestroy, OnInit } from '@angular/core';
import { Notification } from '../../services/notification';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styles: ``,
})
export class Home{
  subscribtion!:Subscription;
  constructor(private _notificationService:Notification){
  }
  // ngOnDestroy(): void {
  //      this.subscribtion.unsubscribe();
  // }
  // ngOnInit(): void {
  //   // this._notificationService.getNotification().subscribe((notification)=>{
  //   //   console.log(notification)
  //   // },(error)=>{
  //   //   console.log(`----------${error}----------`)
  //   // })
  //   // this.subscribtion = this._notificationService.getNotification().subscribe({
  //   this.subscribtion = this._notificationService.getNotification().pipe(
  //     filter((msg)=>msg.startsWith('hamada')),
  //     map((msg)=>`${msg} mahmoud`)
  //   ).subscribe({
  //   next: (notification)=> {console.log(notification)},
  //   error:(error) => {   console.log(`----------${error}----------`)},
  //   complete: ()=> {console.log("notification completed successfully")} 
  //   })
  // }
}

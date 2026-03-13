import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// observable
export class Notification {
  notification:string[]

  constructor() {
    this.notification =[
      "You have unread messages",
      "People reacting to your post",
      "hamada sent you a friend request",
      "",
      "Post shared successfully"
    ]
  }
  getNotification():Observable<string>{
   // before
  //  return new Observable<string>((observer)=>{
  //   let counter = 0
  //   //  observer.next()  // there is update
  //   //  observer.error()  // there is error
  //   //  observer.complete()  // no updates
  //  let notificationInterval = setInterval(() => {
  //     if(counter == this.notification.length){
  //     observer.complete()  // stop
  //     }

  //     if(this.notification[counter]=""){
  //       observer.error("this notification is empty") // stop
  //     }

  //     observer.next(this.notification[counter])
  //     counter++
  //   }, 2000);
  //   return {
  //     unsubscribe:()=>{
  //      clearInterval(notificationInterval)
  //     }
  //   }
  // })
  
   // after
  return from(this.notification);
  }
}

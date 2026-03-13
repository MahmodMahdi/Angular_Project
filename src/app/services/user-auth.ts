import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// here i apply observer design pattern to subscribe on changes that happens 
export class UserAuth {
  private authSubject: BehaviorSubject<boolean>;
  constructor(){
      this.authSubject = new BehaviorSubject<boolean>(false);
  }
  login(){
    localStorage.setItem('token','safsalkjfsadfsafsadf')
     this.authSubject.next(true);
  }
  logout(){
    localStorage.removeItem('token')
    this.authSubject.next(false);
  }
  getUserLogged():boolean{
   return localStorage.getItem('token')?true:false
  }
  getToken():any{
    localStorage.getItem("token")?localStorage.getItem("token"):null
  }
 getAuthSubject():BehaviorSubject<boolean>{
  return this.authSubject;
 }
  
}

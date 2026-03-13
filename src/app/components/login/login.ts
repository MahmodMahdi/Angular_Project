import { Component } from '@angular/core';
import { UserAuth } from '../../services/user-auth';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  isUserLogged:boolean;
  constructor(private userAuth:UserAuth){
   this.isUserLogged = userAuth.getUserLogged()
  }
  login(){
   this.userAuth.login()
      this.isUserLogged = this.userAuth.getUserLogged()
  }
  logout(){
   this.userAuth.logout()
      this.isUserLogged = this.userAuth.getUserLogged()
  }
}

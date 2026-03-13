import { Component, OnInit } from '@angular/core';
import { StaticProducts } from '../../services/static-products';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserAuth } from '../../services/user-auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterLinkActive,CommonModule],
  providers:[StaticProducts],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit{
  isUserLoggedIn!:boolean;
  constructor(private _authService:UserAuth){
  }
  ngOnInit(): void {
    // this.isUserLoggedIn= this._authService.getUserLogged()
   this._authService.getAuthSubject().subscribe({
     next:(status)=>{this.isUserLoggedIn=status}
   })
  }
}


// service follow singleton design pattern so if there any changes on service all that inject this service will see the changes
// with this way by providers if header change any thing in this service he is only see this changes
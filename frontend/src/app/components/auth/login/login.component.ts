import { Component, OnInit } from '@angular/core';
import { LoginStatusComponent } from '../login-status/login-status.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string
  password: string
  errorMessage:string | undefined = undefined;


  constructor(public loginStatus: LoginStatusComponent) {
    this.email="";
    this.password="";
   }

  ngOnInit(): void {
  }

  login(){
    localStorage.setItem("status", "true");
  }

}

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
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


  constructor(public loginStatus: LoginStatusComponent, public router:Router,private titleService:Title) {
    this.email="";
    this.password="";
    this.titleService.setTitle("Login")
  }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['dashboard'])
    localStorage.setItem("status", "true");
  }
}

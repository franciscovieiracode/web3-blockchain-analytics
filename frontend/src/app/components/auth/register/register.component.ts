import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName:String
  lastName:String
  email:String
  password:String
  confirmPassword:String

  checkbox:boolean
  errorMessage:String

  constructor(private titleService:Title, public router:Router) { 
    this.firstName=""
    this.lastName=""
    this.email=""
    this.password=""
    this.confirmPassword=""
    this.errorMessage=""
    this.checkbox = false
    this.titleService.setTitle("Register")
  }

  ngOnInit(): void {
  }

  register(){
    this.router.navigate(['/dashboard'])
  }

}

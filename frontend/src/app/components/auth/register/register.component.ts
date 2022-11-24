import { Component, OnInit } from '@angular/core';

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

  constructor() { 
    this.firstName=""
    this.lastName=""
    this.email=""
    this.password=""
    this.confirmPassword=""
    this.errorMessage=""
    this.checkbox = false
  }

  ngOnInit(): void {
  }

  register(){
    alert(123)
  }

}

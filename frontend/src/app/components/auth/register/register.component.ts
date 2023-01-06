import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/user/auth.service';
import { LoginStatusComponent } from '../login-status/login-status.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName:string
  lastName:string
  email:string
  password:string
  confirmPassword:string

  checkbox:boolean
  errorMessage:String

  wrong:boolean

  constructor(public loginStatus: LoginStatusComponent, public router:Router,private titleService:Title,
    private authService: AuthService) {
    this.firstName=""
    this.lastName=""
    this.email=""
    this.password=""
    this.confirmPassword=""
    this.errorMessage=""
    this.checkbox = false
    this.titleService.setTitle("Register")
    this.wrong=false
  }

  ngOnInit(): void {
    if(this.loginStatus.getStatus()==true)
    this.router.navigate(["dashboard"])
  }

  register(){

    this.authService.register(this.firstName, this.lastName, this.email, this.password, this.confirmPassword, "this.test").subscribe({
      next: (data) => {
        if(data && data.result == true){
          console.log(data);
          localStorage.setItem("currentUser",JSON.stringify(data.token))
          this.router.navigate(["/dashboard"])
        }
      },
      error: (error) =>{
        console.log(error.error);
        
        if(error.status == 400){
          this.errorMessage = "User already registed"
          this.wrong=true
          setTimeout(()=>{this.wrong=false},3000)
        }
        else {
          this.errorMessage ="Please try again later"
        }
      },
      complete: () => console.info('Auth completed') 
  })
  }

}

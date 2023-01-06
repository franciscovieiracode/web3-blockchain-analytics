import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginStatusComponent } from '../login-status/login-status.component';
import { AuthService } from 'src/app/services/user/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string
  password: string
  errorMessage:string | undefined = undefined;
  wrong:boolean


  constructor(public loginStatus: LoginStatusComponent, public router:Router,private titleService:Title,
    private authService: AuthService) {
    this.email="";
    this.password="";
    this.titleService.setTitle("Login")
    this.wrong=false
  }

  ngOnInit(): void {
    if(this.loginStatus.getStatus()==true)
      this.router.navigate(["dashboard"])
  }

  login(){

    this.authService.login(this.email, this.password).subscribe({
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
          this.errorMessage = "Wrong credentials"
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

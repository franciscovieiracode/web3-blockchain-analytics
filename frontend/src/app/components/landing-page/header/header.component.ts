import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStatusComponent } from '../../auth/login-status/login-status.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router:Router, public loginStatus:LoginStatusComponent) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['/login'])
  }

  logout(){
    localStorage.setItem("status", "false");
    this.router.navigate([''])
  }

  transactions(){
    this.router.navigate(['/transactions'])
  }

  connectCardano(){
    this.router.navigate(['/cardano'])
  }

  connectCoinbase(){
    this.router.navigate(['/coinbase'])
  }

  connectEthereum(){
    this.router.navigate(['/ethereum'])
  }

  connectMetamask(){
    this.router.navigate(['/metamask'])
  }

  settingsButton(){
    this.router.navigate(['/settings'])
  }
}

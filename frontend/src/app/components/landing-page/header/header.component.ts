import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetProfileService } from 'src/app/services/user/get-profile.service';
import { LoginStatusComponent } from '../../auth/login-status/login-status.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  profile:any

  constructor(public router:Router, public loginStatus:LoginStatusComponent
    , private getName: GetProfileService) { }

  ngOnInit(): void {
    this.getName.getCurrentProfile().subscribe({
      next: (data) => {
        if (data && data.result == true) {
          console.log(data);
          this.profile = data.user
        }
      },
      error: (error) => {
        console.log(error.error);
      },
      complete: () => console.info('Profile load completed')
    })
  }

  login(){
    this.router.navigate(['/login'])
  }

  logout(){
    localStorage.removeItem("currentUser");
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
  profileButton(){
    this.router.navigate(['/profile'])
  }
  prices(){
    this.router.navigate(['/prices'])
  }
}

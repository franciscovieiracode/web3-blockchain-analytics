import { GetProfileService } from './../../services/user/get-profile.service';
import { GetProfileSettingsService } from './../../services/user/get-profile-settings.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  profile:any
  firstName: any
  lastName: any
  email: any
  phoneNumber:any
  oldPassword:any
  newPassword:any
  confirmPassword:any
  currency:any
  errorMessage: string;
  currencies = [
    { name: 'Dolar', value: 'Dolar' },
    { name: 'Real', value: 'Real' },
    { name: 'Euro', value: 'Euro' },
    { name: 'Yen', value: 'Yen' },
    { name: 'Pound', value: 'Pound' }
];
  constructor(private router:Router,public titleService:Title, private getProfileSettings: GetProfileSettingsService, private getProfile: GetProfileService) {
    this.titleService.setTitle("Settings")
    this.errorMessage=""
   }

  ngOnInit(): void {
    this.getProfile.getCurrentProfile().subscribe({
      next: (data) => {
        if(data && data.result == true){
          console.log(data);
          this.profile = data.user
          this.firstName = this.profile.firstName;
          this.lastName = this.profile.lastName;
          this.email = this.profile.email;
          this.phoneNumber = this.profile.phoneNumber;
          this.currency = this.profile.currency;
          console.log(this.profile.currency);
          
        }
      },
      error: (error) =>{
        console.log(error.error);
        
        if(error.status == 401){
          this.errorMessage = "Please login first"
        }
      },
      complete: () => console.info('Profile load completed') 
  })
  }

  updateSettings(){
    this.getProfileSettings.putProfile(this.firstName,this.lastName,this.email,this.phoneNumber).subscribe({
      next: (data) => {
        if(data && data.result == true){
          console.log(data);
        }
      },
      error: (error) =>{
        console.log(error.error);
        if(error.status == 401){
          this.errorMessage = "Please login first"
        } else if (error.status == 400) {
          this.errorMessage = "Invalid data provided"
        }
      },
      complete: () =>{this.router.navigate(['/dashboard'])
      console.info('Settings update completed')} 
      
    });
  }

  updatePassword(){
    this.getProfileSettings.putPassword(this.oldPassword, this.newPassword, this.confirmPassword).subscribe({
      next: (data) => {
        if(data && data.result == true){
          console.log(data);
        }
      },
      error: (error) =>{
        console.log(error.error);
        if(error.status == 401){
          this.errorMessage = "Please login first"
        } else if (error.status == 400) {
          this.errorMessage = "Invalid data provided"
        }
      },
      complete: () =>{this.router.navigate(['/dashboard'])
      console.info('Password update completed')} 
    });
  }

  updateCurrency() {
    this.getProfileSettings.putCurrency(this.currency).subscribe({
      next: (data) => {
        if(data && data.result == true){
          console.log(data);
        }
      },
      error: (error) =>{
        console.log(error.error);
        if(error.status == 401){
          this.errorMessage = "Please login first"
        } else if (error.status == 400) {
          this.errorMessage = "Invalid data provided"
        }
      },
      complete: () =>{this.router.navigate(['/dashboard'])
      console.info('Currency update completed')} 
    });

  }
  dashboard(){
    this.router.navigate(['/dashboard'])
  }
}







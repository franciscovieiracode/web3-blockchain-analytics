import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  constructor(private router:Router,public titleService:Title) {
    this.titleService.setTitle("Settings")
   }

  ngOnInit(): void {
  }
  
  dashboard(){
    this.router.navigate(['/dashboard'])
  }
}







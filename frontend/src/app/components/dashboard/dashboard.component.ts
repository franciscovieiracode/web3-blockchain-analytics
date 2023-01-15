import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { GetWalletsServiceDashboard } from 'src/app/services/dashboard/get-wallets.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  listAddress:any
  selectedItem:any

  constructor(private titleService:Title, private getWalletsDropdown: GetWalletsServiceDashboard) {
    this.titleService.setTitle("Dashboard")
   }

  ngOnInit(): void {
    this.getWalletsDropdown.getWallets().subscribe({
      next: (data) => {
        if(data && data.result == true){
          console.log(data);
          this.listAddress = data.listAddress
        }
      },
      complete: () => {
        this.selectedItem = this.listAddress[0]
        console.info('Get Wallets completed') }
  })
  }

  onSelect(wallet:string){
    this.selectedItem = wallet
  }

}

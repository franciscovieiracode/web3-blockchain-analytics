import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { GetCoinsPricesService } from 'src/app/services/dashboard/get-coins-prices.service';
import { GetWalletsServiceDashboard } from 'src/app/services/dashboard/get-wallets.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  readonly ETH_CONVERTER = 10**18
  listAddress:any
  selectedItem:any
  totalBalance:any
  totalProfit:any
  coinDetail:any
  coinName:any
  coinId:any
  balance:any
  coinPrice:any
  change24h:any
  details1?:any
  percentageReturn:Number
  piechartValues: number[] | undefined 

  constructor(private titleService:Title, private getWalletsDropdown: GetWalletsServiceDashboard,
    private getWallets:GetCoinsPricesService) {
    this.titleService.setTitle("Dashboard")
    this.percentageReturn=0
   }

  ngOnInit(): void {

    this.getAllWallets()

    setTimeout(() => {
      this.getEthreumWallet(this.listAddress[0].walletAddress)
      console.log();
      
    }, 1000)

  }

  onSelect(wallet:any){

    if(wallet.walletName){
      this.selectedItem = wallet.walletName
      if(wallet.walletAddress[0]==0)
        this.getEthreumWallet(wallet.walletAddress)
      else{
        alert("ada")
      }
    }
    else if(wallet.accountName){
      this.selectedItem = wallet.accountName
    }
    else{
      this.getEthreumWallet(wallet.walletAddress)
      this.selectedItem = wallet.walletAddress
    }

  }

  getAllWallets(){
    this.getWalletsDropdown.getWallets().subscribe({
      next: (data) => {
        if(data && data.result == true){
          //console.log(data);
          this.listAddress = data.listAddress
          //console.log(this.selectedItem);
        }
      },
      complete: () => {
        this.selectedItem = this.listAddress[0].walletName
        //console.info('Get Wallets completed')
      //console.log((243685486560320328 / this.ETH_CONVERTER) * 1526);
       }
  })
  }

  getEthreumWallet(walletAddress:string){
    this.getWallets.getEthreumDetails(walletAddress).subscribe({
      next: (data) => {
        if(data && data.result == true){
          console.log(data);
          let parsedBalance = JSON.parse(data.balance)
          let parsedDetails = JSON.parse(data.coinDetail)
          this.coinDetail = parsedDetails
          this.coinName = this.coinDetail.name
          console.log(parsedDetails);
          this.details1=this.coinDetail
          this.coinId = this.coinDetail.symbol
          console.log(this.details1);

          this.balance = parsedBalance.result/ this.ETH_CONVERTER
          this.coinPrice = data.priceCoin
          console.log(this.coinPrice+ 123123123);
        
          this.totalProfit = data.profit
          this.totalBalance = (parsedBalance.result / this.ETH_CONVERTER) * 1400
          //console.log(this.coinDetail.symbol);

          let percentageRetunTemp = data.totalInvested

          console.log(percentageRetunTemp);
          console.log(this.totalProfit);
          
          

          this.percentageReturn = parseFloat(data.profit)/parseFloat(data.totalInvested)*100
          console.log(this.percentageReturn + "aquiqeuwiq");
          
          this.piechartValues = [1,5,6,4,8,9,7,5,52,12,45,11];
          
        }
      },
      complete: () => {console.info('Get eth completed')}
  })
  }

  getCardanoWallet(walletAddress:string){
    this.getWallets.getCardanoDetails(walletAddress).subscribe({
      next: (data) => {
        if(data && data.result == true){

          console.log(data);
          this.totalBalance = data.address.address
          this.totalBalance = 12
        }
      },
      complete: () => {console.info('Get eth completed')}
  })
  }

}

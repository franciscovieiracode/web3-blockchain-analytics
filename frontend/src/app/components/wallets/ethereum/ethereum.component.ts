import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AddWalletsService } from 'src/app/services/wallets/add-wallets.service';

@Component({
  selector: 'app-ethereum',
  templateUrl: './ethereum.component.html',
  styleUrls: ['./ethereum.component.css']
})
export class EthereumComponent implements OnInit {

  WalletAddress:string
  WalletName:string
  errorMessage:string
  wrong:boolean
  type="ETH"

  constructor(public router:Router,private titleService:Title, private addWalletService:AddWalletsService) {
    this.titleService.setTitle("Ethereum")
    this.WalletAddress=""
    this.WalletName=""
    this.errorMessage=""
    this.wrong=false

   }
  ngOnInit(): void {
  }

  connectComplete(){
    this.addWalletService.addBlockchain(this.WalletAddress, this.WalletName, this.type).subscribe({
      next: (data) => {
        if(data && data.result == true){
          console.log(data);
          this.wrong=true
          setTimeout(()=>{this.wrong=false},1500)
          this.router.navigate(['dashboard'])
        }
      },
      error: (error) =>{
        console.log(error.error);
        
        if(error.status == 400){
          this.errorMessage = "Wallet already exist"
          this.wrong=true
          setTimeout(()=>{this.wrong=false},1500)
        }
        else {
          this.errorMessage ="Please login first"
        }
      },
      complete: () => console.info('Added completed') 
  })
  }

  goBack(){
    this.router.navigate(['/dashboard'])
  }
}

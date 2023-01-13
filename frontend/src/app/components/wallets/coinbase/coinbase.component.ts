import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AddWalletsService } from 'src/app/services/wallets/add-wallets.service';


@Component({
  selector: 'app-coinbase',
  templateUrl: './coinbase.component.html',
  styleUrls: ['./coinbase.component.css']
})
export class CoinbaseComponent implements OnInit {

  accountName:string
  connectionDescription:string
  ApiKey:string
  ApliSecret:string

  errorMessage:any
  wrong:boolean

  constructor(public router:Router,private titleService:Title,
    private addCoinbaseService:AddWalletsService) {
    this.titleService.setTitle("Coinbase")
    this.accountName="",
    this.connectionDescription=""
    this.ApiKey=""
    this.ApliSecret=""
    this.wrong=false
   }
   
  ngOnInit(): void {
  }

  connectComplete(){
    this.addCoinbaseService.addExchange(this.accountName, this.connectionDescription, this.ApiKey,this.ApliSecret).subscribe({
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

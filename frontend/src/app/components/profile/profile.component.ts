import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardService } from 'ngx-clipboard';
import { combineLatest, forkJoin } from 'rxjs';
import { GetProfileService } from 'src/app/services/user/get-profile.service';
import { GetWalletsService } from 'src/app/services/wallets/get-wallets.service';
import { RemoveWalletService } from 'src/app/services/wallets/remove-wallet.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  propeatyGains = ["Lendings", "Loan Interest", "Margin Trading Profit", "Staking"]
  propeatyGainsMoney = "9999,99€"

  incomeGains = ["Airdrop", "Minning", "Salary"]
  incomeGainsMoney = "9999,99€"

  generalDeductions = ["Margin Trading Fee", "Margin Trading Loss"]
  generalDeductionsMoney = "9999,99€"

  nonTaxableGains = ["Bounties", "Gift"]
  nonTaxableGainsMoney = "9999,99€"

  year = ["2021", "2022"]

  finalEth = "https://etherscan.io/tx/"
	teste:any
  closeResult = '';
  wallets:any
  walletsMetamask=""
  walletsBlockchain=""
  walletsExchange=""
    search:string
    searchContact:string
    copied:boolean
    page=1
    pageSize:number
    pageSizeLogins:number

    errorMessage:string

    contacts =[
      {"name":"Alberto","address":"0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c"},
      {"name":"Dinis","address":"0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c"},
      {"name":"Maria","address":"0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c"},
      {"name":"Pedro","address":"0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c"},
      {"name":"Joao","address":"0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c"},
      {"name":"Joaquim","address":"0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c"},
    ]
    

    login=[
      {"date":"08-12-2022","browser":"Chrome(Windows)","ip":"67.218.223.51"},
      {"date":"08-12-2022","browser":"Chrome(Windows)","ip":"67.218.223.51"},
      {"date":"07-12-2022","browser":"Chrome(Windows)","ip":"67.218.223.51"},
      {"date":"07-12-2022","browser":"Chrome(Windows)","ip":"67.218.223.51"},
      {"date":"06-12-2022","browser":"Chrome(Windows)","ip":"67.218.223.51"},
      {"date":"01-12-2022","browser":"Chrome(Windows)","ip":"67.218.223.51"},
      {"date":"01-12-2022","browser":"Chrome(Windows)","ip":"67.218.223.51"},
      {"date":"01-12-2022","browser":"Chrome(Windows)","ip":"67.218.223.51"},
    ]

    rules=[
      {"name":"Minning","criteria":"Minning","behaviour":"Taxable","tax":"28%"},
      {"name":"Eth gift","criteria":"Gift","behaviour":"Non-Taxable","tax":"0%"}
    ]
    name:String
    description:String
    criteria:String
    behaviour:String
    taxRule:Number

    walletName:String

    profile:any
   
    constructor(private _clipboardService: ClipboardService,private http:HttpClient,
       public route: Router, public titleService:Title,private modalService: NgbModal,
       private getProfileService: GetProfileService, private getWallets:GetWalletsService,
       private removeWallet: RemoveWalletService) {
      this.copied=false
      this.search=""
      this.pageSize=10
      this.pageSizeLogins=6
      this.titleService.setTitle("Profile")
      this.name=""
      this.description=""
      this.criteria=""
      this.behaviour=""
      this.taxRule=0
      this.walletName=""
      this.searchContact=""
      this.errorMessage=""
    }

  ngOnInit(): void {
    this.getProfileService.getCurrentProfile().subscribe({
      next: (data) => {
        if(data && data.result == true){
          console.log(data);
          this.profile = data.user
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

  this.getWallets.getBlockchain().subscribe({
    next: (data) => {
      if(data && data.result == true){
        console.log(data);
        this.walletsBlockchain = JSON.parse(data.address)
      }
    },
    error: (error) =>{
      console.log(error.error);
      
      if(error.status == 401){
        this.errorMessage = "Please login first"
      }
    },
    complete: () => console.info('Blochain Wallets load completed') 
})

this.getWallets.getExchange().subscribe({
  next: (data) => {
    if(data && data.result == true){
      console.log(data);
      this.walletsExchange = JSON.parse(data.address)
    }
  },
  error: (error) =>{
    console.log(error.error);
    
    if(error.status == 401){
      this.errorMessage = "Please login first"
    }
  },
  complete: () => console.info('Exchange wallets load completed') 
})

this.getWallets.getMetamask().subscribe({
  next: (data) => {
    if(data && data.result == true){
      console.log(data);
      this.walletsMetamask = JSON.parse(data.address)
      setTimeout(() => {
        this.wallets = this.walletsExchange.concat(this.walletsBlockchain,this.walletsMetamask)
      }, 100);
      console.log(this.wallets);
      
    }
  },
  error: (error) =>{
    console.log(error.error);
    
    if(error.status == 401){
      this.errorMessage = "Please login first"
    }
  },
  complete: () => console.info("Loaded Metamask")
 
})

  }

  buttonNewRule() {
    this.route.navigate(["/newRule"])
  }

  buttonExport(){
    alert("Downloading! :)")
  }

  copy(data:any){
    this._clipboardService.copy(data)
  
    this.copied=true
    
    setTimeout(()=>{this.copied=false},2000)
  }
  
  clickMethod(wallet: any) {
    if(wallet.accountName == null){
      this.removeWallet.removeWallet(wallet.WalletAddress,null).subscribe({
        next: (data) => {
          if(data && data.result == true){
            console.log("deleted" );            
          }
        },
        error: (error) =>{
          console.log(error.error);
          
          if(error.status == 401){
            this.errorMessage = "Please login first"
          }
        },
        complete: () => console.info("Loaded Metamask")
       
      })    }else{
        if(wallet.accountName != null){
          this.removeWallet.removeWallet(null,wallet.accountName).subscribe({
            next: (data) => {
              if(data && data.result == true){
                console.log("deleted" );            
              }
            },
            error: (error) =>{
              console.log(error.error);
              
              if(error.status == 401){
                this.errorMessage = "Please login first"
              }
            },
            complete: () => console.info("Loaded Metamask")
           
          })     }
  }
}

  deleteRule(name:String){
    alert("Deleted "+name+" Rule")
  }

  
  open(content:any) {
    this.modalService.open(content);
  }

  openEditContact(contentContact:any){
    this.modalService.open(contentContact);

  }

}

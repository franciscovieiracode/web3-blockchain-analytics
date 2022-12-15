import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  propeatyGains = ["Lendings", "Loan Interest", "Marin traing Profit", "staking"]
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
  wallets =[
    {"type":"car","connection":"cardano","value":"€ 17.90","address":"0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c"},
    {"type":"eth","connection":"ethereum","value":"€ 17.90","address":"0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c"},
    {"type":"meta","connection":"metamask","value":"€ 17.90","address":"0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c"},
    {"type":"coinbase","connection":"coinbase","value":"€ 17.90","address":"0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c"},
    {"type":"car","connection":"cardano","value":"€ 17.90","address":"0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c"},
    {"type":"eth","connection":"ethereum","value":"€ 17.90","address":"0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c"},
    {"type":"meta","connection":"metamask","value":"€ 17.90","address":"0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c"},
    {"type":"coinbase","connection":"coinbase","value":"€ 17.90","address":"0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c"},
    {"type":"car","connection":"cardano","value":"€ 17.90","address":"0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c"},
    {"type":"eth","connection":"ethereum","value":"€ 17.90","address":"0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c"},
    {"type":"meta","connection":"metamask","value":"€ 17.90","address":"0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c"},
    {"type":"coinbase","connection":"coinbase","value":"€ 17.90","address":"0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c"}, ]
    search:string
    copied:boolean
    page=1
    pageSize:number
    pageSizeLogins:number

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
   
    constructor(private _clipboardService: ClipboardService,private http:HttpClient,
       public route: Router, public titleService:Title) {
      this.copied=false
      this.search=""
      this.pageSize=10
      this.pageSizeLogins=6
      this.titleService.setTitle("Profile")
    }

  ngOnInit(): void {
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
  
  clickMethod(name: string) {
    if(confirm("Are you sure to delete "+ name +"?")) {
      console.log("Implement delete functionality here");
    }
  }

}

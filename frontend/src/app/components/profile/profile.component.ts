import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


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

   
    constructor(private _clipboardService: ClipboardService,private http:HttpClient) {
      this.copied=false
      this.search=""
      this.pageSize=10
    }

  ngOnInit(): void {
  }



}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css']
})
export class DetailedComponent {
  ticket="ETHUSDT"
  data=[{"s":"ETHUSDT","st":"TRADING","b":"ETH","q":"USDT","ba":"Ξ","qa":"","i":"0.00010000","ts":"0.01","an":"Ethereum","qn":"TetherUS","o":"1231.88","h":"1256.38","l":"1222.01","c":"1253.67","v":"306258.81","qv":"378749284.342418","y":0,"as":306258.80190000,"pm":"USDT","pn":"USDT","cs":122373866,"tags":["mining-zone","Layer1_Layer2","pos"],"pom":false,"pomt":null,"lc":false,"g":true,"sd":false,"r":false,"hd":false,"rb":true,"etf":false}]
  ticketData:any
  notFound:boolean = false

  constructor(public router:Router){

  }
  ngOnInit(): void {
      this.ticketData=this.data[0]
  }

  mainmenu(){
    this.router.navigate(['/prices'])
  }

}

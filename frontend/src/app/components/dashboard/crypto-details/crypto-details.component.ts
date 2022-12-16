import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crypto-details',
  templateUrl: './crypto-details.component.html',
  styleUrls: ['./crypto-details.component.css']
})
export class CryptoDetailsComponent implements OnInit {

  data=[
    {"name":"Ethereum","symbol":"ETH","balance":"9.958,50","coin_value":"1.278,85", "total":"127.512,40","return24h":5},
    {"name":"Cardano","symbol":"ADA","balance":"270.500","coin_value":"0,31", "total":"83,700","return24h":2}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

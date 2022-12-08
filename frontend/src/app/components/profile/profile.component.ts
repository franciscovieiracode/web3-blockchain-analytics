import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(public route: Router) { }

  ngOnInit(): void {
  }

  buttonNewRule() {
    this.route.navigate(["/newRule"])
  }

  buttonExport(){
    alert("Downloading! :)")
  }

}

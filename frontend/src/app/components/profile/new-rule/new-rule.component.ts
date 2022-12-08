import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-rule',
  templateUrl: './new-rule.component.html',
  styleUrls: ['./new-rule.component.css']
})
export class NewRuleComponent implements OnInit {

  dropdownLabels = ["Lendings", "Loan Interest", "Marin traing Profit", "Staking", "Airdrop", "Minning", "Salary", "Margin Trading Fee", "Margin Trading Loss", "Bounties", "Gift"]
  behaviour = ["Taxable", "Non-Taxable"]

  ruleName: string
  ruleDescription: string
  ruleTax: string
  ruleCriteria: string
  ruleBehaviour: string

  constructor(public route: Router) { 
    this.ruleName = ""
    this.ruleDescription = ""
    this.ruleTax = ""
    this.ruleCriteria=""
    this.ruleBehaviour = ""
  }

  ngOnInit(): void {
  }

  buttonBack() {
    this.route.navigate(["/profile"])
  }

  buttonSave() {
    console.log(this.ruleCriteria, this.ruleBehaviour)
    this.route.navigate(["/dashboard"])
  }

  

}

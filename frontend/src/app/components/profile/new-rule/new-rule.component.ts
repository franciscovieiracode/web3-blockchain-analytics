import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RulesService } from 'src/app/services/user/rules.service';

@Component({
  selector: 'app-new-rule',
  templateUrl: './new-rule.component.html',
  styleUrls: ['./new-rule.component.css']
})
export class NewRuleComponent implements OnInit {

  dropdownLabels = [
    {name: "Lendings", value: "Lendings"},
    {name: "Loan Interest", value: "Loan Interest"},
    {name: "Marin traing Profit", value: "Marin traing Profit"},
    {name: "Staking", value: "Staking"},
    {name: "Airdrop", value: "Airdrop"},
    {name: "Minning", value: "Minning"},
    {name: "Salary", value: "Salary"},
    {name: "Margin Trading Fee", value: "Margin Trading Fee"},
    {name: "Margin Trading Loss", value: "Margin Trading Loss"},
    {name: "Bounties", value: "Bounties"},
    {name: "Gift", value: "Gift"},
  ]
  
  behaviour = [
    {name:"Taxable", value:"Taxable"},
    {name:"Non-Taxable", value:"Non-Taxable"}
  ]

  ruleName: string
  ruleDescription: string
  ruleTax: number
  ruleCriteria: string
  ruleBehaviour: string
  errorMessage:string

  constructor(public route: Router,public titleService:Title, private getRules: RulesService) { 
    this.ruleName = ""
    this.ruleDescription = ""
    this.ruleTax = 0
    this.ruleCriteria=""
    this.ruleBehaviour = ""
    this.titleService.setTitle("New Rule")
    this.errorMessage=""
  }

  ngOnInit(): void {
  }

  buttonBack() {
    this.route.navigate(["/profile"])
  }

  buttonSave(name: string, description: string, criteria: string, behaviour: string, tax: number) {
    this.getRules.addRules(name, description, criteria, behaviour, tax).subscribe({
			next: (data) => {
				if (data && data.result == true) {
					data.rules.Name = name
          data.rules.Description = description
          data.rules.Criteria = criteria
          data.rules.Behaviour = behaviour
          data.rules.Tax = tax
					console.log(data.rules);
				}
			},
			error: (error) => {
				console.log(error.error);
				if (error.status == 401) {
					this.errorMessage = "Please login first"
				}
			},
			complete: () => console.info("Edit Rule complete")
		})
    this.route.navigate(["/profile"])
  }
}

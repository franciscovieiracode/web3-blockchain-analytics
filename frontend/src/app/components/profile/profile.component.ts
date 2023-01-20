import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardService } from 'ngx-clipboard';
import { combineLatest, forkJoin } from 'rxjs';
import { TransactionService } from 'src/app/services/transactions/transaction.service';
import { ContactsService } from 'src/app/services/user/contacts.service';
import { GetProfileService } from 'src/app/services/user/get-profile.service';
import { RulesService } from 'src/app/services/user/rules.service';
import { GetWalletsService } from 'src/app/services/wallets/get-wallets.service';
import { RemoveWalletService } from 'src/app/services/wallets/remove-wallet.service';
import jspdf from 'jspdf'
import 'jspdf-autotable'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',

  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  propeatyGains = ["Lendings", "Loan Interest", "Margin Trading Profit", "Staking"]
  propeatyGainsMoney = 0

  incomeGains = ["Airdrop", "Minning", "Salary"]
  incomeGainsMoney = 0

  generalDeductions = ["Margin Trading Fee", "Margin Trading Loss"]
  generalDeductionsMoney = 0

  nonTaxableGains = ["Bounties", "Gift"]
  nonTaxableGainsMoney = 0


  gains:any

  year = ["2021", "2022"]

  finalEth = "https://etherscan.io/tx/"
  teste: any
  closeResult = '';
  wallets: any
  walletsMetamask = ""
  walletsBlockchain = ""
  walletsExchange = ""
  search: string
  searchContact: string
  copied: boolean
  page = 1
  pageSize: number
  pageSizeLogins: number
  errorMessage: string
  contacts: any[] = []
  login:any[] = []

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
  
  rules: any[] = []

  name: String
  nameRule:string
  descriptionRule: string
  criteriaRule: string
  behaviourRule: string
  taxRule: number
  walletName: string
  profile: any
  address: string


  constructor(private _clipboardService: ClipboardService, private http: HttpClient,
    public route: Router, public titleService: Title, private modalService: NgbModal,
    private getProfileService: GetProfileService, private getWallets: GetWalletsService,
    private getContacts: ContactsService, private removeWallet: RemoveWalletService, private getRules: RulesService) {
    this.copied = false
    this.search = ""
    this.pageSize = 10
    this.pageSizeLogins = 6
    this.titleService.setTitle("Profile")
    this.name = ""
    this.nameRule = ""
    this.descriptionRule = ""
    this.criteriaRule = ""
    this.behaviourRule = ""
    this.taxRule = 0
    this.walletName = ""
    this.searchContact = ""
    this.errorMessage = ""
    this.address = ""
  }

  ngOnInit(): void {
    this.getProfileService.getCurrentProfile().subscribe({
      next: (data) => {
        if (data && data.result == true) {
          console.log(data);
          this.profile = data.user
        }
      },
      error: (error) => {
        console.log(error.error);

        if (error.status == 401) {
          this.errorMessage = "Please login first"
        }
      },
      complete: () => console.info('Profile load completed')
    })

    this.getProfileService.getLoginHistory().subscribe({
      next: (data) => {
        if (data && data.result == true) {
          console.log(data);
          this.login = JSON.parse(data.address)
        }
      },
      error: (error) => {
        console.log(error.error);

        if (error.status == 401) {
          this.errorMessage = "Please login first"
        }
      },
      complete: () => console.info('Login history load completed')
    })

    this.getWallets.getBlockchain().subscribe({
      next: (data) => {
        if (data && data.result == true) {
          console.log(data);
          this.walletsBlockchain = JSON.parse(data.address)
        }
      },
      error: (error) => {
        console.log(error.error);

        if (error.status == 401) {
          this.errorMessage = "Please login first"
        }
      },
      complete: () => console.info('Blochain Wallets load completed')
    })
    

    this.getWallets.getExchange().subscribe({
      next: (data) => {
        if (data && data.result == true) {
          console.log(data);
          this.walletsExchange = JSON.parse(data.address)
        }
      },
      error: (error) => {
        console.log(error.error);

        if (error.status == 401) {
          this.errorMessage = "Please login first"
        }
      },
      complete: () => console.info('Exchange wallets load completed')
    })

    this.getWallets.getMetamask().subscribe({
      next: (data) => {
        if (data && data.result == true) {
          console.log(data);
          this.walletsMetamask = JSON.parse(data.address)
          setTimeout(() => {
            this.wallets = this.walletsExchange.concat(this.walletsBlockchain, this.walletsMetamask)
          }, 100);
          console.log(this.wallets);

        }
      },
      error: (error) => {
        console.log(error.error);

        if (error.status == 401) {
          this.errorMessage = "Please login first"
        }
      },
      complete: () => console.info("Loaded Metamask")

    })

    this.getContacts.getContacts().subscribe({
      next: (data) => {
        if (data && data.result == true) {
          console.log(data);
          this.contacts = JSON.parse(data.contacts)
          console.log(this.contacts);
        }
      },
      error: (error) => {
        console.log(error.error);
        if (error.status == 401) {
          this.errorMessage = "Please login first"
        }
      },
      complete: () => console.info("Loaded Contacts")
    })

    this.getRules.getRules().subscribe({
      next: (data) => {
        if (data && data.result == true) {
          console.log(data);
          this.rules = JSON.parse(data.rules)
          console.log(this.rules);
        }
      },
      error: (error) => {
        console.log(error.error);
        if (error.status == 401) {
          this.errorMessage = "Please login first"
        }
      },
      complete: () => console.info("Loaded Rules")
    })

    this.getProfileService.getTax().subscribe({
      next: (data) => {
        if (data && data.result == true) {
          //console.log(data);
          this.gains = data.reason
          console.log(this.gains);
          
        }
      },
      error: (error) => {
        console.log(error.error);
        if (error.status == 401) {
          this.errorMessage = "Please login first"
        }
      },
      complete: () => console.info("Loaded Gains")
    })

  }

  buttonNewRule() {
    this.route.navigate(["/newRule"])
  }

  buttonExport() {
    
    var pdf = new jspdf()

    pdf.setFontSize(20)
    pdf.text("Welcome to Block analytics",11,25);
    pdf.text("This is your tax report  "+this.gains+" €",25,32);


    

    pdf.output("dataurlnewwindow")
    pdf.save("taxReport.pdf")
  }

  copy(data: any) {
    this._clipboardService.copy(data)
    this.copied = true
    setTimeout(() => { this.copied = false }, 2000)
  }

  clickMethod(wallet: any) {
    if (wallet.accountName == null) {
      this.removeWallet.removeWallet(wallet.WalletAddress, null).subscribe({
        next: (data) => {
          if (data && data.result == true) {
            console.log("deleted");
          }
        },
        error: (error) => {
          console.log(error.error);

          if (error.status == 401) {
            this.errorMessage = "Please login first"
          }
        },
        complete: () => console.info("Loaded Metamask")

      })
    } else {
      if (wallet.accountName != null) {
        this.removeWallet.removeWallet(null, wallet.accountName).subscribe({
          next: (data) => {
            if (data && data.result == true) {
              console.log("deleted");
            }
          },
          error: (error) => {
            console.log(error.error);

            if (error.status == 401) {
              this.errorMessage = "Please login first"
            }
          },
          complete: () => console.info("Loaded Metamask")

        })
      }
    }
  }

  open(content: any) {
    this.modalService.open(content);
  }

  openEditRules(content: any) {
    this.modalService.open(content);
  }
  editRule(name: string, description: string, criteria: string, behaviour: string, tax: number, d: any) {
    this.getRules.editRules(name, description, criteria, behaviour, tax).subscribe({
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
    d('Saved');
  }

  clickMethodDeleteRule(name: string, criteria: string, behaviour: string, tax: number) {
    this.getRules.deleteRules(name, criteria, behaviour, tax).subscribe({
      next: (data) => {
        if (data && data.result == true) {
          console.log(data.rules);
        }
      },
      error: (error) => {
        console.log(error.error);
        if (error.status == 401) {
          this.errorMessage = "Please login first"
        }
      },
      complete: () => console.info("Delete Rule complete")
    })
  }

  openEditContact(contentContact: any, walletAddress: string) {
    this.address = walletAddress;
    this.modalService.open(contentContact);
  }

  editContact(address: string, name: string, d: any) {
    this.getContacts.editContacts(address, name).subscribe({
      next: (data) => {
        if (data && data.result == true) {
          data.contacts.WalletName = name
          console.log(data.contacts);
        }
      },
      error: (error) => {
        console.log(error.error);
        if (error.status == 401) {
          this.errorMessage = "Please login first"
        }
      },
      complete: () => console.info("Edit Contact complete")
    })
    d('Saved');
  }

  clickMethodDelete(contactAddress: string, contactName: string) {
    this.getContacts.deleteContacts(contactAddress, contactName).subscribe({
      next: (data) => {
        if (data && data.result == true) {
          console.log(data.contacts);
        }
      },
      error: (error) => {
        console.log(error.error);
        if (error.status == 401) {
          this.errorMessage = "Please login first"
        }
      },
      complete: () => console.info("Delete Contact complete")
    })
  }
}

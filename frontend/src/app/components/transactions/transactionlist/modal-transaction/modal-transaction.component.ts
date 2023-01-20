import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { elementAt } from 'rxjs';
import { ContactsService } from 'src/app/services/user/contacts.service';

@Component({
  selector: 'app-modal-transaction',
  templateUrl: './modal-transaction.component.html',
  styleUrls: ['./modal-transaction.component.css']
})
export class ModalTransactionComponent implements OnInit {
  @Input() fromParent: any;

  finalEthAd = "https://etherscan.io/address/"
  contacts: any[] = []
  contact: string
  name: string
  errorMessage: string

  constructor(public activeModal: NgbActiveModal, private getContacts: ContactsService) {
    this.name = ""
    this.errorMessage = ""
    this.contact=""
  }

  ngOnInit(): void {
    this.getContacts.getContacts().subscribe({
      next: (data) => {
        if (data && data.result == true) {
          console.log(data);
          this.contacts = JSON.parse(data.contacts)
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

  }

}

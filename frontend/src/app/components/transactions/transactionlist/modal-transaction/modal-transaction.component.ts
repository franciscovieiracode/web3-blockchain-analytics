import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-transaction',
  templateUrl: './modal-transaction.component.html',
  styleUrls: ['./modal-transaction.component.css']
})
export class ModalTransactionComponent {
  @Input() fromParent:any;

  finalEthAd = "https://etherscan.io/address/"

  constructor(public activeModal:NgbActiveModal){
    
  }

}

import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.component.html',
  styleUrls: ['./modal-details.component.css']
})

export class ModalDetailsComponent {
  @Input() fromParent:any;

  constructor(public activeModal:NgbActiveModal){}
}

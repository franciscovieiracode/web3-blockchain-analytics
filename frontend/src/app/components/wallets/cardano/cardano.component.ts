import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardano',
  templateUrl: './cardano.component.html',
  styleUrls: ['./cardano.component.css']
})
export class CardanoComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  connectComplete(){
    this.router.navigate(['/dashboard'])
  }

  goBack(){
    this.router.navigate(['/dashboard'])
  }
}

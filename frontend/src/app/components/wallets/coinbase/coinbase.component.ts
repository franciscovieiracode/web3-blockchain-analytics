import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-coinbase',
  templateUrl: './coinbase.component.html',
  styleUrls: ['./coinbase.component.css']
})
export class CoinbaseComponent implements OnInit {

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

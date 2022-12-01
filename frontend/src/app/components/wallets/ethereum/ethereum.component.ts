import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ethereum',
  templateUrl: './ethereum.component.html',
  styleUrls: ['./ethereum.component.css']
})
export class EthereumComponent implements OnInit {

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

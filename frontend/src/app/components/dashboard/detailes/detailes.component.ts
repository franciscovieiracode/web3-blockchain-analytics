import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailes',
  templateUrl: './detailes.component.html',
  styleUrls: ['./detailes.component.css']
})
export class DetailesComponent implements OnInit {
  @Input() totalBalance: any;
  @Input() totalProfit: any;
  @Input() percentageReturn:any

  constructor() { }

  ngOnInit(): void {
  }

}


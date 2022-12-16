import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailes',
  templateUrl: './detailes.component.html',
  styleUrls: ['./detailes.component.css']
})
export class DetailesComponent implements OnInit {

  data={"balance":"12.000,52","profit":"2.000","gain":"20"}

  constructor() { }

  ngOnInit(): void {
  }

}


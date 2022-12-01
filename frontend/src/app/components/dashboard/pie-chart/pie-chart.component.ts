import { Component, OnInit } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries
} from "ng-apexcharts";


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  
  chartSeries: ApexNonAxisChartSeries=[0.65,0.35]

  chartDetails: ApexChart = {
    type:'pie',
    toolbar:{
      show:true
    }
  }

  chartLabels=["Ethereum", "Cardano"]

  constructor() { }

  ngOnInit(): void {
  }

}

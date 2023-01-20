import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
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

  
  @Input() coinId :any

  

  chartSeries: ApexNonAxisChartSeries=[1,0]

  chartDetails: ApexChart = {
    type:'pie',
    toolbar:{
      show:true
    }
  }

  chartLabels=["Ethereum", "Cardano"]

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
      if (changes['coinId'] && changes['coinId'].currentValue) {
        if(this.coinId == "eth"){
          this.chartSeries=[1,0];
        }else{
          this.chartSeries=[1,0];
        }
        this.cdr.detectChanges();
      }
    }
  ngOnInit(): void {
    if(this.coinId == "eth"){
      this.chartSeries=[1,0]
    }else{
      this.chartSeries=[0,1]

    }
  }

}
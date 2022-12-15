import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetPricesService } from 'src/app/services/crypto-prices/get-prices.service';
import { ModalDetailsComponent } from './modal-details/modal-details.component';

@Component({
  selector: 'app-crypto-prices',
  templateUrl: './crypto-prices.component.html',
  styleUrls: ['./crypto-prices.component.css']
})
export class CryptoPricesComponent {

  prices:any
  search:string
  sorted:any

  constructor(public router:Router, private titleService: Title,
     private getPricesService:GetPricesService,private modalService: NgbModal){
    this.search=""
    this.sorted=""
    this.titleService.setTitle("Crypto Prices")
  }

  ngOnInit():void{
    this.getPricesService.getPrices().subscribe((price:any)=>{
      if(price){
        this.sorted = price.sort((a:any, b:any) => parseFloat(b.price) - parseFloat(a.price));
        this.prices = this.sorted
        console.log(this.prices);
      }
    })
    setInterval(() => {         
      this.getPricesService.getPrices().subscribe((price:any)=>{
        if(price)
          this.sorted = price.sort((a:any, b:any) => parseFloat(b.price) - parseFloat(a.price));
          this.prices = this.sorted
      }
    )}, 5000);}

		openDetails(priceDetail:any){
			const modalRef = this.modalService.open(ModalDetailsComponent,{
				size:"md", centered:true
			});
			modalRef.componentInstance.fromParent = priceDetail;
			
		}
  }



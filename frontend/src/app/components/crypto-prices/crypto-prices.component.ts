import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crypto-prices',
  templateUrl: './crypto-prices.component.html',
  styleUrls: ['./crypto-prices.component.css']
})
export class CryptoPricesComponent {

  prices=[
    {"symbol":"BTCUSDT","price":"16947.59000000"},{"symbol":"ETHUSDT","price":"1249.96000000"},{"symbol":"BNBUSDT","price":"287.60000000"},{"symbol":"LTCUSDT","price":"75.51000000"},{"symbol":"ADAUSDT","price":"0.31050000"},{"symbol":"XRPUSDT","price":"0.38770000"},{"symbol":"EOSUSDT","price":"0.98800000"},{"symbol":"XLMUSDT","price":"0.08440000"},{"symbol":"TRXUSDT","price":"0.05361000"},{"symbol":"VETUSDT","price":"0.01879000"},{"symbol":"LINKUSDT","price":"6.91300000"},{"symbol":"XMRUSDT","price":"147.30000000"},{"symbol":"MATICUSDT","price":"0.90670000"},{"symbol":"ATOMUSDT","price":"9.69000000"},{"symbol":"ALGOUSDT","price":"0.22080000"},{"symbol":"DOGEUSDT","price":"0.09649000"},{"symbol":"HBARUSDT","price":"0.04740000"},{"symbol":"SOLUSDT","price":"13.56000000"},{"symbol":"MANAUSDT","price":"0.39390000"},{"symbol":"SANDUSDT","price":"0.58330000"},{"symbol":"UNIUSDT","price":"6.10000000"},{"symbol":"AVAXUSDT","price":"13.26000000"},{"symbol":"NEARUSDT","price":"1.67100000"},{"symbol":"CAKEUSDT","price":"3.94700000"},{"symbol":"SHIBUSDT","price":"0.00000921"},{"symbol":"ICPUSDT","price":"4.29200000"},{"symbol":"APEUSDT","price":"3.87900000"}]
  search:string
  sorted:any

  constructor(public router:Router){
    this.search=""
    this.sorted=""
  }

  detailed(detailed:any){
    this.router.navigate(["/prices/",detailed])
  }
}

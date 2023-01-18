import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

const endpoint = "https://localhost:7280/api/Wallets/"
const prices = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,cardano&vs_currencies=usd"
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class GetCoinsPricesService {

  constructor(private http: HttpClient) { }

  getEthreumDetails(wallet:string):Observable<any>{
    return this.http.post(endpoint+"getEthereumDetails", new GetBlockchainModel(wallet))
    .pipe(catchError(this.handleError));
  }

  getCardanoDetails(wallet:string):Observable<any>{
    return this.http.post(endpoint, new GetBlockchainModel(wallet)).pipe(catchError(this.handleError))
  }

getPricesEthAndAda():Observable<any>{
    return this.http.get(prices, httpOptions).pipe(catchError(this.handleError))
}

  handleError(error:HttpErrorResponse) {
    return throwError(() => {
        return error;
    });
  }

}

export class GetBlockchainModel{
  constructor(public walletAddress:string){}

}

  

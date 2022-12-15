import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

const endpoint = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';


@Injectable({
  providedIn: 'root'
})
export class GetPricesService {

  constructor(private http: HttpClient) { }

  getPrices():Observable<any>{
    return this.http.get(endpoint).pipe(catchError(this.handleError))
  }


  handleError(error:HttpErrorResponse) {
    return throwError(() => {
        return error;
    });
  }
}

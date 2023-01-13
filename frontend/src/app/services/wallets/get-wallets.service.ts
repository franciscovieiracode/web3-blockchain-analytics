import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

const endpoint = 'https://localhost:7280/api/Wallets/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class GetWalletsService {

  constructor(private http: HttpClient) { }
 

  getBlockchain():Observable<any>{
    return this.http.get(endpoint+"getBlockchain",httpOptions)
    .pipe(catchError(this.handleError));
  }


  getExchange():Observable<any>{
    return this.http.get(endpoint+"getExchange",httpOptions)
    .pipe(catchError(this.handleError));
  }

  getMetamask():Observable<any>{
    return this.http.get(endpoint+"getMetamask",httpOptions)
    .pipe(catchError(this.handleError));
  }

  handleError(error:HttpErrorResponse) {
    return throwError(() => {
        return error;
    });
  }
}

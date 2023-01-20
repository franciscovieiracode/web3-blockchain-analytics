import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

const endpoint = 'https://localhost:7280/api/Wallets/deleteWallet';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RemoveWalletService {

  constructor(private http: HttpClient) { }

  removeWallet(WalletAddress:any, accountName:any):Observable<any>{
    return this.http.post(endpoint, new removeWallet(WalletAddress,accountName)).pipe(catchError(this.handleError));
  }

  handleError(error:HttpErrorResponse) {
    return throwError(() => {
        return error;
    });
  }

}

export class removeWallet{
  constructor(public WalletAddress:any, public accountName:any){}

}
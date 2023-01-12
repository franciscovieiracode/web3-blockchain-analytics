import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
export class AddWalletsService {

  constructor(private http: HttpClient, private router:Router) { }

  addBlockchain(WalletAddress:string, WalletName:string):Observable<any>{
    return this.http.post(endpoint+"addBlockchain", new addBlockchainModel(WalletAddress,WalletName)).pipe(catchError(this.handleError));
  }

  handleError(error:HttpErrorResponse) {
    return throwError(() => {
        return error;
    });
  }
}


export class addBlockchainModel{
  constructor(public WalletAddress:string, public WalletName:string){}

}
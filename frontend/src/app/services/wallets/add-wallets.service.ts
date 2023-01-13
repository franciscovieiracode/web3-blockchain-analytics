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

  addBlockchain(WalletAddress:string, WalletName:string, Type:string):Observable<any>{
    return this.http.post(endpoint+"addBlockchain", new addBlockchainModel(WalletAddress,WalletName, Type)).pipe(catchError(this.handleError));
  }

  addExchange(accountName:string,connectionDescription:string,ApiKey:string,ApliSecret:string):Observable<any>{
    return this.http.post(endpoint+"addExchange", new addExchangeModel(accountName,connectionDescription,ApiKey,ApliSecret))
  }

  addMetamask(WalletAddress:string):Observable<any>{
    return this.http.post(endpoint+"addMetamask", new addMetamaskModel(WalletAddress)).pipe(catchError(this.handleError));
  }

  handleError(error:HttpErrorResponse) {
    return throwError(() => {
        return error;
    });
  }
}


export class addBlockchainModel{
  constructor(public WalletAddress:string, public WalletName:string, public Type:string){}

}

export class addMetamaskModel{
  constructor(public WalletAddress:string){}
}

export class addExchangeModel{
  constructor(public accountName:string, public connectionDescription:string, public ApiKey:string, public ApliSecret:string){}
}
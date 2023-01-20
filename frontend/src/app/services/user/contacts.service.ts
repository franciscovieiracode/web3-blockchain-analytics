import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';


const endpoint = 'https://localhost:7280/api/Contacts/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }

  getContacts(): Observable<any> {
    return this.http.get(endpoint + "getContacts", httpOptions)
      .pipe(catchError(this.handleError));
  }

  addContacts(WalletAddress: string, WalletName: string): Observable<any> {
    return this.http.post(endpoint + "addContacts", new Contacts(WalletAddress, WalletName))
      .pipe(catchError(this.handleError));
  }

  editContacts(WalletAddress: string, WalletName: string): Observable<any> {
    return this.http.put(endpoint + "editContacts", new Contacts(WalletAddress, WalletName))
      .pipe(catchError(this.handleError));
  }

  deleteContacts(WalletAddress: string, WalletName: string): Observable<any> {
    return this.http.post(endpoint + "deleteContacts", new Contacts(WalletAddress, WalletName))
      .pipe(catchError(this.handleError));
  }


  handleError(error: HttpErrorResponse) {
    return throwError(() => {
      return error;
    });
  }

}

export class Contacts {
  constructor(public WalletAddress: string, public WalletName: string) { }
}



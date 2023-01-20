import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

const endpoint = 'https://localhost:7280/api/Profile/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class GetProfileService {

  constructor(private http: HttpClient) { }

  getCurrentProfile():Observable<any>{
    return this.http.get(endpoint+"getProfile",httpOptions)
    .pipe(catchError(this.handleError));
  }

  getLoginHistory():Observable<any>{
    return this.http.get(endpoint+"getLoginHistory",httpOptions)
    .pipe(catchError(this.handleError));
  }

  handleError(error:HttpErrorResponse) {
    return throwError(() => {
        return error;
    });
  }

  

}

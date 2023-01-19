import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

const endpoint = 'https://localhost:7280/api/Settings/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class GetProfileSettingsService {
  constructor(private http: HttpClient) { }

  putProfile(firstName:string, lastName:string, email:string, phoneNumber:string): Observable<any> {
    return this.http.put(endpoint+"updateProfileSettings",new SettingsModel(firstName,lastName,email,phoneNumber))
    .pipe(catchError(this.handleError));
  }

  putPassword(oldPassword:string, newPassword:string, confirmPassword:string): Observable<any> {
    return this.http.put(endpoint+"updatePassword", new PasswordModel(oldPassword, newPassword, confirmPassword))
    .pipe(catchError(this.handleError));
}

putCurrency(currency: string): Observable<any> {
  return this.http.put(endpoint+"updateCurrency", new CurencyModel(currency))
  .pipe(catchError(this.handleError));
}

  handleError(error:HttpErrorResponse) {
    return throwError(() => {
        return error;
    });
  }
}

export class SettingsModel{
  constructor(public firstName:string, public lastName:string, public email:string, public phoneNumber:string){}
}

export class PasswordModel{
  constructor(public oldPassword:string, public newPassword:string, public confirmPassword:string){}
}

export class CurencyModel{
  constructor(public currency:string){}
}

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';


const endpoint = 'https://localhost:7280/api/Rules/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  constructor(private http: HttpClient) { }

  getRules(): Observable<any> {
    return this.http.get(endpoint + "getRules", httpOptions)
      .pipe(catchError(this.handleError));
  }

  addRules(Name: string, Description: string, Criteria: string, Behaviour: string, Tax: number): Observable<any> {
    return this.http.post(endpoint + "addRules", new Rules(Name, Description, Criteria, Behaviour, Tax))
      .pipe(catchError(this.handleError));
  }

  editRules(Name: string, Description: string, Criteria: string, Behaviour: string, Tax: number): Observable<any> {
    return this.http.put(endpoint + "editRules", new Rules(Name, Description, Criteria, Behaviour, Tax))
      .pipe(catchError(this.handleError));
  }

  deleteRules(Name: string, Criteria: string, Behaviour: string, Tax: number): Observable<any> {
    return this.http.post(endpoint + "deleteRules", new DeleteRules(Name, Criteria, Behaviour, Tax))
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => {
      return error;
    });
  }
}

export class Rules {
  constructor(public Name: string, public Description: string, public Criteria: string, public Behaviour: string, public Tax: number) { }
}

export class DeleteRules {
  constructor(public Name: string, public Criteria: string, public Behaviour: string, public Tax: number) { }
}
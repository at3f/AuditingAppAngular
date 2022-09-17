import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { IActionType } from "./IActionType";
import { IApplication } from "./IApplication";
import { IParameterType } from "./IParameterType";

@Injectable({
  providedIn:'root'
})
export class SearchService{
  Url = 'http://127.0.0.1:5050/'

  constructor(private http:HttpClient){}

  getApplications(): Observable<IApplication[]>{
    return this.http.get<IApplication[]>(this.Url+'applications').pipe(
      tap(data=>console.log(JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  getActionTypes(): Observable<IActionType[]>{
    return this.http.get<IActionType[]>(this.Url+'actiontypes').pipe(
      tap(data=>console.log(JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  getParameterTypes(): Observable<IParameterType[]>{
    return this.http.get<IParameterType[]>(this.Url+'paramtypes').pipe(
      tap(data=>console.log(JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

}

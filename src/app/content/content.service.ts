import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { EventEmitterService } from "../event-emitter.service";
import { IQueryParams } from "../search/IQueryParams";
import { IAction } from "./IAction";

@Injectable({
  providedIn:'root'
})
export class ContentService{
  actionUrl = 'http://127.0.0.1:5050/actions'
  constructor(private http:HttpClient){}

  getActions(queryParams:any): Observable<IAction[]>{
    return this.http.get<IAction[]>(this.actionUrl,{params:queryParams}).pipe(
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

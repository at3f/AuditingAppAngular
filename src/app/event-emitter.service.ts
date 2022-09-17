import { HttpParams } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { IQueryParams } from './search/IQueryParams';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeFirstComponentFunction = new EventEmitter();
  subsVar!: Subscription;

  constructor() { }

  onFirstComponentButtonClick(queryParams:IQueryParams) {
    this.invokeFirstComponentFunction.emit(queryParams);
  }
}

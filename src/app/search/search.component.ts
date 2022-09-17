import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventEmitterService } from '../event-emitter.service';
import { IActionType } from './IActionType';
import { IApplication } from './IApplication';
import { IQueryParams } from './IQueryParams';
import { IParameterType } from './IParameterType';
import { SearchService } from './search.service';

@Component({
  selector: 'as-root',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(private searchService:SearchService,private eventEmitterService:EventEmitterService) { }
  sub1!:Subscription
  sub2!:Subscription
  sub3!:Subscription
  applications!:IApplication[]
  actionTypes!:IActionType[]
  parameterTypes!:IParameterType[]

  userName:string=""
  beName:string=""
  paramValue:string=""
  actionTypeId!:number
  applicationId!:number
  paramTypeId!:number

  applicationChange(e:any){
    this.applicationId=e.target.value
  }
  actionTypeChange(e:any){
    this.actionTypeId=e.target.value
  }
  paramTypeChange(e:any){
    this.paramTypeId=e.target.value
  }

  queryParams!:IQueryParams

  onClick(){
    let queryParams:IQueryParams = {
      userName:this.userName,
      beName:this.beName,
      paramValue:this.paramValue,
      actionTypeId:this.actionTypeId,
      applicationId:this.applicationId,
      paramTypeId:this.paramTypeId
    }
    this.eventEmitterService.onFirstComponentButtonClick(queryParams)
  }

  ngOnInit(): void {
    this.sub1 = this.searchService.getApplications().subscribe({
      next: applications => {
        this.applications = applications
      }
    })

    this.sub2 = this.searchService.getActionTypes().subscribe({
      next: actionTypes => {
        this.actionTypes = actionTypes
      }
    })

    this.sub3 = this.searchService.getParameterTypes().subscribe({
      next: parameterTypes => {
        this.parameterTypes = parameterTypes
      }
    })

  }
  ngOnDestroy(): void {
    this.sub1.unsubscribe
    this.sub2.unsubscribe
    this.sub3.unsubscribe
  }
}

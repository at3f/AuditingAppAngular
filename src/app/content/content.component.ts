import { HttpParams } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventEmitterService } from '../event-emitter.service';
import { IQueryParams } from '../search/IQueryParams';
import { ContentService } from './content.service';
import { IAction } from './IAction';

@Component({
  selector: 'c-root',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit,OnDestroy {

  constructor(private contentService:ContentService,private eventEmitterService:EventEmitterService) { }
  sub!:Subscription
  p: number = 1;
  itemsPerPage: number = 6;
  isChecked:boolean = false;

  actions:IAction[]=[]
  ngOnInit(): void {
    this.sub = this.contentService.getActions("").subscribe({
      next: actions => {
        this.actions = actions
      }
    })
    if(this.eventEmitterService.subsVar==undefined){
      this.eventEmitterService.subsVar=this.eventEmitterService.invokeFirstComponentFunction.subscribe(
        (queryParams:IQueryParams)=>{
          this.getActions(queryParams)
        }
      )
    }

  }

  getActions(queryParams:IQueryParams):void{
    let params = new HttpParams()
    if(queryParams.userName!="")params=params.append('username', queryParams.userName)
    if(queryParams.beName!="")params=params.append('bename', queryParams.beName)
    if(queryParams.actionTypeId)params=params.append('actiontypeid', queryParams.actionTypeId)
    if(queryParams.applicationId)params=params.append('appid', queryParams.applicationId)
    if(queryParams.paramTypeId&&queryParams.paramValue!=""){
      params=params.append('paramtypeid', queryParams.paramTypeId)
      params=params.append('paramvalue', queryParams.paramValue)
  }


    this.sub = this.contentService.getActions(params).subscribe({
      next: actions => {
        this.actions = actions,
        this.p = 1;
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe
  }
}

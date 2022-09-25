import { IActionType } from "./IActionType"
import { IBusiness } from "./IBusiness"
import { IUser } from "./IUser"

export interface IAction{
  id:number
  description_en:string
  description_ar:string
  user:IUser
  be:IBusiness
  actionType:IActionType
}

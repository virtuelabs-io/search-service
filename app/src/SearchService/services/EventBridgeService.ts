import * as AWS from 'aws-sdk'

import {Constants} from "../utils/Constants";


export class EventBridgeService {
  private _bus: AWS.EventBridge
  private _entry: AWS.EventBridge.Types.PutEventsRequestEntry = {}

  constructor(source: string,
              detailType: string,
              busName: string = process.env.BUS_NAME!,
              region: string = process.env.FUNC_REGION!) {
    AWS.config.update({region: region})
    this._bus = new AWS.EventBridge()
    this._entry.Source = source
    this._entry.EventBusName = busName
    this._entry.DetailType = detailType
    this._entry.Time = new Date()
  }

  get entry(): AWS.EventBridge.Types.PutEventsRequestEntry{
    return this._entry
  }

  set entryDetail(message: any) {
    this._entry.Detail = JSON.stringify(message)
  }

  public async publish() {
    let response = await this._bus.putEvents({Entries: [this._entry]}).promise()
    if(response) {
      console.log(`${Constants.LOG_LEVEL.INFO}: successfully pushed event(s) to bus: ${response.Entries}`);
    } else {
      console.log(`${Constants.LOG_LEVEL.ERROR}: message queuing failed while pushing to bus`);
    }
    return response
  }
}

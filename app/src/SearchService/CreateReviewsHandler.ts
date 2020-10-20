import {NOT_FOUND, CREATED, OK} from "http-status"

import {ESService} from "./services/ESService";
import {ESRequest} from "./config/ESRequest";
import {Constants} from "./utils/Constants";
import {ESServiceResponse} from "./types/ESServiceResponse";
import {EventBridgeService} from "./services/EventBridgeService";


export async function fun(event, context = {}, callback = {}) {
  event.body.cId = event.cognitoPoolClaims.sub
  let persistence = new ESService()
  let insertRequest = new ESRequest(Constants.ES_DOCTYPES._DOC, event.body, Constants.HTTP_METHOD.POST)
  let insert = await new Promise<ESServiceResponse>(((resolve, reject) => {
    console.log(`${Constants.LOG_LEVEL.INFO}: Inserting Review`)
    persistence.fire(insertRequest.request, resolve, reject)
  }))

  let response: ESServiceResponse = {
    statusCode: NOT_FOUND.valueOf(),
    message: NOT_FOUND.toLocaleString(),
    data: {}
  }

  if (insert.statusCode === CREATED.valueOf()) {
    let fetchRequest = new ESRequest([Constants.ES_DOCTYPES._DOC, insert.data["_id"]].join(Constants.PATH_SEPARATOR))
    response = await new Promise<ESServiceResponse>(((resolve, reject) => {
      console.log(`${Constants.LOG_LEVEL.INFO}: Fetching review ${insert.data["_id"]}`)
      persistence.fire(fetchRequest.request, resolve, reject)
    }))
  }

  if(response.data._version === 1 && response.statusCode === OK.valueOf()) {
    let messageService = new EventBridgeService(Constants.BUS.SOURCES.REVIEW, Constants.BUS.DETAIL_TYPES.CREATED)
    messageService.entryDetail = response.message
    await messageService.publish()
  }
  return response
}

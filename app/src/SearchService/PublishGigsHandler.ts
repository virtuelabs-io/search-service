import {NOT_FOUND, OK} from "http-status"

import {ESService} from "./services/ESService";
import {ESRequest} from "./config/ESRequest";
import {Constants} from "./utils/Constants";
import {ESServiceResponse} from "./types/ESServiceResponse";

// TODO: Fire a message to handle communication
export async function fun(event, context = {}, callback = {}) {
  const gigId = event.path.id
  let persistence = new ESService()
  let updateRequest = new ESRequest(
    [Constants.ES_DOCTYPES._UPDATE, gigId].join(Constants.PATH_SEPARATOR),
    { "doc": { "enabled": true } },
    Constants.HTTP_METHOD.POST
  )
  let update = await new Promise<ESServiceResponse>(((resolve, reject) => {
    console.log(`${Constants.LOG_LEVEL.INFO}: Publishing Gig ${gigId}`)
    persistence.fire(updateRequest.request, resolve, reject)
  }))
  let response: ESServiceResponse = {
    statusCode: NOT_FOUND.valueOf(),
    message: NOT_FOUND.toLocaleString(),
    data: {}
  }
  if (update.statusCode === OK.valueOf()) {
    let fetchRequest = new ESRequest([Constants.ES_DOCTYPES._DOC, gigId].join(Constants.PATH_SEPARATOR))
    response = await new Promise<ESServiceResponse>(((resolve, reject) => {
      console.log(`${Constants.LOG_LEVEL.INFO}: Fetching Gig ${gigId}`)
      persistence.fire(fetchRequest.request, resolve, reject)
    }))
  }
  return response
}

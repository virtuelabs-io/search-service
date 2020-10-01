import {CREATED, NOT_FOUND, OK} from "http-status"

import {ESService} from "./services/ESService";
import {ESRequest} from "./config/ESRequest";
import {Constants} from "./utils/Constants";
import {ESServiceResponse} from "./types/ESServiceResponse";


export async function fun(event, context = {}, callback = {}) {
  const profileId = event.path.id
  let persistence = new ESService()
  let updateRequest = new ESRequest(
    [Constants.ES_DOCTYPES._DOC, profileId].join(Constants.PATH_SEPARATOR),
    event.body,
    Constants.HTTP_METHOD.PUT
  )
  let update = await new Promise<ESServiceResponse>(((resolve, reject) => {
    console.log(`${Constants.LOG_LEVEL.INFO}: Updating Profile ${profileId}`)
    persistence.fire(updateRequest.request, resolve, reject)
  }))
  let response: ESServiceResponse = {
    statusCode: NOT_FOUND.valueOf(),
    message: NOT_FOUND.toLocaleString(),
    data: {}
  }
  if (update.statusCode === OK.valueOf() || update.statusCode === CREATED.valueOf()) {
    let fetchRequest = new ESRequest([Constants.ES_DOCTYPES._DOC, profileId].join(Constants.PATH_SEPARATOR))
    response = await new Promise<ESServiceResponse>(((resolve, reject) => {
      console.log(`${Constants.LOG_LEVEL.INFO}: Fetching Profile ${profileId}`)
      persistence.fire(fetchRequest.request, resolve, reject)
    }))
  }
  return response
}

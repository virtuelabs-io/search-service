import {UNAUTHORIZED} from "http-status";

import {ESService} from "./services/ESService";
import {ESRequest} from "./config/ESRequest";
import {Constants} from "./utils/Constants";
import {ESServiceResponse} from "./types/ESServiceResponse";


export async function fun(event, context = {}, callback = {}) {
  const reviewId = event.path.id
  let response: ESServiceResponse = {
    statusCode: UNAUTHORIZED.valueOf(),
    message: UNAUTHORIZED.toLocaleString(),
    data: {}
  }

  let persistence = new ESService()
  let fetchRequest = new ESRequest([Constants.ES_DOCTYPES._DOC, reviewId].join(Constants.PATH_SEPARATOR))
  let fetchResponse = await new Promise<ESServiceResponse>(((resolve, reject) => {
    console.log(`${Constants.LOG_LEVEL.INFO}: Fetching review ${reviewId}`)
    persistence.fire(fetchRequest.request, resolve, reject)
  }))

  if(fetchResponse.data._source.cId !== event.cognitoPoolClaims.sub){
    return response
  }

  let deleteRequest = new ESRequest(
    [Constants.ES_DOCTYPES._DOC, reviewId].join(Constants.PATH_SEPARATOR),
    {},
    Constants.HTTP_METHOD.DELETE
  )

  response = await new Promise<ESServiceResponse>(((resolve, reject) => {
    console.log(`${Constants.LOG_LEVEL.INFO}: Delete Review ${reviewId}`)
    persistence.fire(deleteRequest.request, resolve, reject)
  }))

  return response
}

import {UNAUTHORIZED} from "http-status";

import {ESService} from "./services/ESService";
import {ESRequest} from "./config/ESRequest";
import {Constants} from "./utils/Constants";
import {ESServiceResponse} from "./types/ESServiceResponse";


export async function fun(event, context = {}, callback = {}) {
  const gigId = event.path.id
  let response: ESServiceResponse = {
    statusCode: UNAUTHORIZED.valueOf(),
    message: UNAUTHORIZED.toLocaleString(),
    data: {}
  }
  let persistence = new ESService()
  let fetchRequest = new ESRequest([Constants.ES_DOCTYPES._DOC, gigId].join(Constants.PATH_SEPARATOR))
  let fetchResponse = await new Promise<ESServiceResponse>(((resolve, reject) => {
    console.log(`${Constants.LOG_LEVEL.INFO}: Fetching review ${gigId}`)
    persistence.fire(fetchRequest.request, resolve, reject)
  }))

  if(fetchResponse.data._source.seller.sId !== event.cognitoPoolClaims.sub){
    return response
  }

  let deleteRequest = new ESRequest(
    [Constants.ES_DOCTYPES._DOC, gigId].join(Constants.PATH_SEPARATOR),
    {},
    Constants.HTTP_METHOD.DELETE
  )
  response = await new Promise<ESServiceResponse>(((resolve, reject) => {
    console.log(`${Constants.LOG_LEVEL.INFO}: Delete Gig ${gigId}`)
    persistence.fire(deleteRequest.request, resolve, reject)
  }))
  return response
}

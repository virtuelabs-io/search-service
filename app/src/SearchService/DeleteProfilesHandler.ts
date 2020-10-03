import {ESService} from "./services/ESService";
import {ESRequest} from "./config/ESRequest";
import {Constants} from "./utils/Constants";
import {ESServiceResponse} from "./types/ESServiceResponse";


export async function fun(event, context = {}, callback = {}) {
  let persistence = new ESService()
  let deleteRequest = new ESRequest(
    [Constants.ES_DOCTYPES._DOC, event.cognitoPoolClaims.sub].join(Constants.PATH_SEPARATOR),
    {},
    Constants.HTTP_METHOD.DELETE
  )

  let response = await new Promise<ESServiceResponse>(((resolve, reject) => {
    console.log(`${Constants.LOG_LEVEL.INFO}: Delete Profile ${event.cognitoPoolClaims.sub}`)
    persistence.fire(deleteRequest.request, resolve, reject)
  }))

  return response
}

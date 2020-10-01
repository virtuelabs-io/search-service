import {ESService} from "./services/ESService";
import {ESRequest} from "./config/ESRequest";
import {Constants} from "./utils/Constants";
import {ESServiceResponse} from "./types/ESServiceResponse";


export async function fun(event, context = {}, callback = {}) {
  const profileId = event.path.id
  let persistence = new ESService()
  let deleteRequest = new ESRequest(
    [Constants.ES_DOCTYPES._DOC, profileId].join(Constants.PATH_SEPARATOR),
    {},
    Constants.HTTP_METHOD.DELETE
  )
  let response = await new Promise<ESServiceResponse>(((resolve, reject) => {
    console.log(`${Constants.LOG_LEVEL.INFO}: Delete Profile ${profileId}`)
    persistence.fire(deleteRequest.request, resolve, reject)
  }))
  return response
}

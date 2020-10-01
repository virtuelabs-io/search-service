import {ESService} from "./services/ESService";
import {ESRequest} from "./config/ESRequest";
import {Constants} from "./utils/Constants";
import {ESServiceResponse} from "./types/ESServiceResponse";


export async function fun(event, context = {}, callback = {}) {
  const reviewId = event.path.id
  let persistence = new ESService()
  let readRequest = new ESRequest([Constants.ES_DOCTYPES._DOC, reviewId].join(Constants.PATH_SEPARATOR))
  let response = await new Promise<ESServiceResponse>(((resolve, reject) => {
    console.log(`${Constants.LOG_LEVEL.INFO}: Get Review ${reviewId}`)
    persistence.fire(readRequest.request, resolve, reject)
  }))
  return response
}

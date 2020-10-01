import {ESService} from "./services/ESService";
import {ESRequest} from "./config/ESRequest";
import {Constants} from "./utils/Constants";
import {ESServiceResponse} from "./types/ESServiceResponse";


export async function fun(event, context = {}, callback = {}) {
  let persistence = new ESService()
  let searchRequest = new ESRequest(Constants.ES_DOCTYPES._SEARCH, event.body)
  let response = await new Promise<ESServiceResponse>(((resolve, reject) => {
    console.log(`${Constants.LOG_LEVEL.INFO}: Search Reviews query\n${event.body}`)
    persistence.fire(searchRequest.request, resolve, reject)
  }))
  return response
}

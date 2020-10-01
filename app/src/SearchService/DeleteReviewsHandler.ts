import {ESService} from "./services/ESService";
import {ESRequest} from "./config/ESRequest";
import {Constants} from "./utils/Constants";
import {ESServiceResponse} from "./types/ESServiceResponse";

// TODO: validate if the review can be posted based on customer's transactions
// TODO: Validate if the request can delete the review
export async function fun(event, context = {}, callback = {}) {
  const reviewId = event.path.id
  let persistence = new ESService()
  let deleteRequest = new ESRequest(
    [Constants.ES_DOCTYPES._DOC, reviewId].join(Constants.PATH_SEPARATOR),
    {},
    Constants.HTTP_METHOD.DELETE
  )
  let response = await new Promise<ESServiceResponse>(((resolve, reject) => {
    console.log(`${Constants.LOG_LEVEL.INFO}: Delete Review ${reviewId}`)
    persistence.fire(deleteRequest.request, resolve, reject)
  }))
  return response
}

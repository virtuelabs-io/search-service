import {NOT_FOUND, CREATED} from "http-status"

import {ESService} from "./services/ESService";
import {ESRequest} from "./config/ESRequest";
import {Constants} from "./utils/Constants";
import {ESServiceResponse} from "./types/ESServiceResponse";

// TODO: validate if the review can be posted based on customer's transactions
export async function fun(event, context = {}, callback = {}) {
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
    let fetchRequest = new ESRequest(
      [Constants.ES_DOCTYPES._DOC, insert.data["_id"]].join(Constants.PATH_SEPARATOR),
      {}
      )
    response = await new Promise<ESServiceResponse>(((resolve, reject) => {
      console.log(`${Constants.LOG_LEVEL.INFO}: Fetching review ${insert.data["_id"]}`)
      persistence.fire(fetchRequest.request, resolve, reject)
    }))
  }
  return response
}

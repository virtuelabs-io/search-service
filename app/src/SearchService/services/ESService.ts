import * as AWS from "aws-sdk";
import {INTERNAL_SERVER_ERROR} from "http-status"

import {Constants} from "../utils/Constants";
import {ESServiceResponse} from "../types/ESServiceResponse";


export class ESService {

  private _httpClient: any

  constructor() {
    // @ts-ignore
    this._httpClient = new AWS.HttpClient();
  }

  public fire(request: AWS.HttpRequest, resolve, reject) {
    let _response: ESServiceResponse = { statusCode: 0, message: "", data: {} }
    console.log(`${Constants.LOG_LEVEL.INFO}: path=${request.path} method:${request.method}`)
    this._httpClient.handleRequest(request, null, function(response) {
      const _statusCode = response.statusCode
      const _statusMessage = response.statusMessage
      console.log(`${Constants.LOG_LEVEL.INFO}: statusCode=${_statusCode} statusMessage:${_statusMessage}`)
      let data = '';
      response.on('data', function (chunk) {
        data += chunk;
      });
      response.on('end', function (chunk) {
        _response.statusCode = _statusCode
        _response.message = _statusMessage
        _response.data = JSON.parse(data)
        resolve(_response)
      });
    }, function(error) {
      console.log(`${Constants.LOG_LEVEL.ERROR}: statusCode=500 statusMessage:${error}`)
      _response.statusCode = INTERNAL_SERVER_ERROR.valueOf()
      _response.message = error.toString()
      _response.data = {}
      reject(_response)
    })
  }
}

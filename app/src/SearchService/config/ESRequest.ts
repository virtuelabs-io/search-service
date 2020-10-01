import * as AWS from "aws-sdk";
import * as V4Signer from 'aws-sdk/lib/signers/v4'

import {ESConfig} from "./ESConfig";
import {Constants} from "../utils/Constants";


export class ESRequest {

  private _esConfig: ESConfig
  private _endpoint: AWS.Endpoint
  private _request: AWS.HttpRequest
  private _credentials: AWS.EnvironmentCredentials

  constructor(pathSuffix: string, payload: Object = {}, method: string = Constants.HTTP_METHOD.GET) {
    this._esConfig = new ESConfig()
    this._credentials = new AWS.EnvironmentCredentials('AWS')
    this._endpoint = new AWS.Endpoint(this._esConfig.domain)
    this._request = new AWS.HttpRequest(this._endpoint, this._esConfig.region)
    this._request.method = method
    this._request.path += [this._esConfig.index, pathSuffix].join(Constants.PATH_SEPARATOR)
    this._request.headers[Constants.HTTP_HEADERS.HOST] = this._endpoint.host
    this._request.headers[Constants.HTTP_HEADERS.CONTENT_TYPE] = Constants.CONTENT_TYPE_APP_JSON
    this._request.body = JSON.stringify(payload)
    this._request.headers[Constants.HTTP_HEADERS.CONTENT_LENGTH] = Buffer.byteLength(this._request.body).toString()
    this.signRequest(this._request)
  }

  private signRequest(request: AWS.HttpRequest) {
    let signer = new V4Signer(this._request , Constants.ES);
    signer.addAuthorization(this._credentials, new Date())
  }

  get request(): AWS.HttpRequest{
    return this._request
  }
}

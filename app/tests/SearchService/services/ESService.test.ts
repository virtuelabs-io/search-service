import {expect} from "chai"
import {OK, METHOD_NOT_ALLOWED} from "http-status"
import * as AWS from "aws-sdk";

import {ESService} from "../../../src/SearchService/services/ESService"
import {Constants as appConstants} from "../../../src/SearchService/utils/Constants"
import {ESRequest} from "../../../src/SearchService/config/ESRequest";
import {ESServiceResponse} from "../../../src/SearchService/types/ESServiceResponse"

import {Secrets} from "../secrets/secrets"
import {Constants} from "../utils/Constants"
import {Commons} from "../utils/Commons"

describe('ESService', function() {
  before(Commons.setUpGigsTestEnvironment)

  it('Positive test', async function() {
    let persistence = new ESService()
    let readRequest = new ESRequest([appConstants.ES_DOCTYPES._DOC, Constants.VALIDATION_GIG_ID]
      .join(appConstants.PATH_SEPARATOR))
    let response = await new Promise<ESServiceResponse>(((resolve, reject) => {
      persistence.fire(readRequest.request, resolve, reject)
    }))

    expect(response)
      .to.have.property("statusCode")
      .with.equal(OK.valueOf())

    expect(response)
      .to.have.property("message")
      .with.equal("OK")

    expect(response)
      .to.have.property("data")

    expect(response.data)
      .to.have.property("_index")
      .with.equal(`${Secrets.ENVIRONMENT}.${Constants.GIGS}`)

    expect(response.data)
      .to.have.property("_id")
      .with.equal(Constants.VALIDATION_GIG_ID)

    expect(response.data)
      .to.have.property("_type")
      .with.equal(appConstants.ES_DOCTYPES._DOC)
  })

  it('Negative test', async function() {
    let persistence = new ESService()

    let response = await new Promise<ESServiceResponse>(((resolve, reject) => {
      persistence.fire(new AWS.HttpRequest(new AWS.Endpoint(Secrets.DOMAIN),Secrets.FUNC_REGION), resolve, reject)
    }))

    expect(response)
      .to.have.property("statusCode")
      .with.equal(METHOD_NOT_ALLOWED.valueOf())

    expect(response)
      .to.have.property("message")

    expect(response)
      .to.have.property("data")
  })
})

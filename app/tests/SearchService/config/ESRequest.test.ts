import {expect} from "chai"

import {ESRequest} from "../../../src/SearchService/config/ESRequest"
import {Constants as appConstants} from "../../../src/SearchService/utils/Constants"

import {Secrets} from "../secrets/secrets"
import {Constants} from "../utils/Constants"
import {TestData} from "../utils/TestData"
import {Commons} from "../utils/Commons"

describe('ESRequest', function() {
  before(Commons.setUpGigsTestEnvironment)

  it('POST Request', function() {
    let insertRequest = new ESRequest(appConstants.ES_DOCTYPES._DOC, TestData.gig, appConstants.HTTP_METHOD.POST)
    expect(insertRequest).to.have.property("request")

    const request = insertRequest.request

    expect(request.body)
      .to.be.a(Constants.STRING)

    expect(request.body)
      .to.equal(JSON.stringify(TestData.gig))

    expect(request.method)
      .to.equal(appConstants.HTTP_METHOD.POST)

    expect(request.path).to.equal(
      ["",`${Secrets.ENVIRONMENT}.${Constants.GIGS}`, appConstants.ES_DOCTYPES._DOC].join(appConstants.PATH_SEPARATOR)
    )

    expect(request.headers)
      .to.have.property("host")
      .with.equal(Secrets.DOMAIN.replace("https://", ""))

    expect(request.headers)
      .to.have.property("Content-Type")
      .with.equal(appConstants.CONTENT_TYPE_APP_JSON)

    expect(request)
      .to.have.property("region")

    expect(request['region'])
      .to.equal(Secrets.FUNC_REGION)

    expect(request.headers)
      .to.have.property("X-Amz-Date")

    expect(request.headers)
      .to.have.property("Authorization")

    expect(request)
      .to.have.property("endpoint")
  })

  it('PUT Request', function() {
    const request = new ESRequest(appConstants.ES_DOCTYPES._DOC, TestData.gig, appConstants.HTTP_METHOD.PUT).request

    expect(request.path).to.equal(
      ["",`${Secrets.ENVIRONMENT}.${Constants.GIGS}`, appConstants.ES_DOCTYPES._DOC].join(appConstants.PATH_SEPARATOR)
    )

    expect(request.method)
      .to.equal(appConstants.HTTP_METHOD.PUT)
  })

  it('DELETE Request', function() {
    const request = new ESRequest(appConstants.ES_DOCTYPES._DOC, {}, appConstants.HTTP_METHOD.DELETE).request

    expect(request.path).to.equal(
      ["",`${Secrets.ENVIRONMENT}.${Constants.GIGS}`, appConstants.ES_DOCTYPES._DOC].join(appConstants.PATH_SEPARATOR)
    )

    expect(request.method)
      .to.equal(appConstants.HTTP_METHOD.DELETE)
  })

  it('GET Request', function() {
    const request = new ESRequest(appConstants.ES_DOCTYPES._DOC).request

    expect(request.path).to.equal(
      ["",`${Secrets.ENVIRONMENT}.${Constants.GIGS}`, appConstants.ES_DOCTYPES._DOC].join(appConstants.PATH_SEPARATOR)
    )

    expect(request.method)
      .to.equal(appConstants.HTTP_METHOD.GET)
  })

  it('Search Request', function() {
    const request = new ESRequest(appConstants.ES_DOCTYPES._SEARCH, TestData.defaultSearch).request

    expect(request.path).to.equal(
      ["",`${Secrets.ENVIRONMENT}.${Constants.GIGS}`, appConstants.ES_DOCTYPES._SEARCH].join(appConstants.PATH_SEPARATOR)
    )

    expect(request.body)
      .to.equal(JSON.stringify(TestData.defaultSearch))

    expect(request.method)
      .to.equal(appConstants.HTTP_METHOD.GET)
  })

  it('Partial Update Request', function() {
    const request = new ESRequest(
      [appConstants.ES_DOCTYPES._UPDATE, Constants.VALIDATION_GIG_ID].join(appConstants.PATH_SEPARATOR),
      TestData.gitPartialUpdate,
      appConstants.HTTP_METHOD.POST
    ).request

    expect(request.path).to.equal(
      ["",`${Secrets.ENVIRONMENT}.${Constants.GIGS}`, appConstants.ES_DOCTYPES._UPDATE, Constants.VALIDATION_GIG_ID]
        .join(appConstants.PATH_SEPARATOR)
    )

    expect(request.body)
      .to.equal(JSON.stringify(TestData.gitPartialUpdate))

    expect(request.method)
      .to.equal(appConstants.HTTP_METHOD.POST)
  })
})

import {expect} from "chai"
import {OK} from "http-status"

import {fun} from "../../src/SearchService/GetReviewsHandler"
import {Constants as appConstants} from "../../src/SearchService/utils/Constants"

import {TestData} from "./utils/TestData"
import {Secrets} from "./secrets/secrets"
import {Constants} from "./utils/Constants"
import {Commons} from "./utils/Commons"

describe('GetReviewsHandler', function() {
  let event = TestData.defaultEvent

  before(Commons.setUpReviewsTestEnvironment)

  it('Validate', async function() {
    event.path.id = Constants.VALIDATION_REVIEW_ID
    let response = await fun(event)

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
      .with.equal(`${Secrets.ENVIRONMENT}.${Constants.REVIEWS}`)

    expect(response.data)
      .to.have.property("_type")
      .with.equal(appConstants.ES_DOCTYPES._DOC)

    expect(response.data)
      .to.have.property("found")
      .with.equal(true)
  })
})

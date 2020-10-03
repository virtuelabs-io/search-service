import {expect} from "chai"
import {OK} from "http-status"

import {fun} from "../../src/SearchService/SearchReviewsHandler"

import {TestData} from "./utils/TestData"
import {Commons} from "./utils/Commons"

describe('SearchReviewsHandler', function() {
  before(Commons.setUpReviewsTestEnvironment)

  it('Validate', async function() {
    let response = await fun({body: TestData.defaultSearch})

    expect(response)
      .to.have.property("statusCode")
      .with.equal(OK.valueOf())

    expect(response)
      .to.have.property("message")
      .with.equal("OK")

    expect(response)
      .to.have.property("data")

    expect(response.data)
      .to.have.property("hits")
      .to.have.property("hits")
      .to.be.a("array")
  })
})

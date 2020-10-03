import {expect} from "chai"
import {OK} from "http-status"

import {fun as createFun} from "../../src/SearchService/CreateReviewsHandler"
import {fun} from "../../src/SearchService/DeleteReviewsHandler"
import {Constants as appConstants} from "../../src/SearchService/utils/Constants"

import {TestData} from "./utils/TestData"
import {Secrets} from "./secrets/secrets"
import {Constants} from "./utils/Constants"
import {Commons} from "./utils/Commons"

describe('DeleteReviewsHandler', function() {
  let event = TestData.defaultEvent

  before(Commons.setUpReviewsTestEnvironment)
  event.body = TestData.review
  beforeEach(async function(){
    let response = await createFun(event)
    if(response.statusCode === OK.valueOf()) {
      console.log("[INFO]: Successfully created test record")
      event.path.id = response.data["_id"]
    } else {
      throw new Error("[ERROR]: Unable to perform pre-test action")
    }
  })

  it('Validate', async function() {
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
      .to.have.property("result")
      .with.equal("deleted")
  })
})

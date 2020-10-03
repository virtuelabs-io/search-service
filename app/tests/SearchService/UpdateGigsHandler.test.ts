import {expect} from "chai"
import {OK} from "http-status"

import {fun} from "../../src/SearchService/UpdateGigsHandler"
import {fun as createFun} from "../../src/SearchService/CreateGigsHandler"
import {fun as deleteFun} from "../../src/SearchService/DeleteGigsHandler"
import {Constants as appConstants} from "../../src/SearchService/utils/Constants"

import {TestData} from "./utils/TestData"
import {Secrets} from "./secrets/secrets"
import {Constants} from "./utils/Constants"
import {Commons} from "./utils/Commons"

describe('UpdateGigsHandler', function() {
  let event = TestData.defaultEvent
  before(Commons.setUpGigsTestEnvironment)
  beforeEach(async function(){
    event.body = TestData.gig
    let response = await createFun(event)
    if(response.statusCode === OK.valueOf()) {
      console.log("[INFO]: Successfully created test record")
      event.path.id = response.data["_id"]
    } else {
      throw new Error("[ERROR]: Unable to perform pre-test action")
    }
  })

  it('Validate', async function() {
    event.body = TestData.gig
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
      .with.equal(`${Secrets.ENVIRONMENT}.${Constants.GIGS}`)

    expect(response.data)
      .to.have.property("_type")
      .with.equal(appConstants.ES_DOCTYPES._DOC)

    expect(response.data)
      .to.have.property("found").with.equal(true)

    expect(response.data)
      .to.have.property("_id")
      .with.equal(event.path.id)
  })

  afterEach(async function (){
    let response = await deleteFun(event)
    if(response.statusCode === OK.valueOf()){
      console.log("[INFO]: Successfully cleaned up test record")
    } else {
      throw new Error("[ERROR]: Error cleaning up test record")
    }
  })
})

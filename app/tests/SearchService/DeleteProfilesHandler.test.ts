import {expect} from "chai"
import {OK} from "http-status"
import { v4 as uuidv4 } from "uuid"

import {fun as createFun} from "../../src/SearchService/UpdateProfilesHandler"
import {fun} from "../../src/SearchService/DeleteProfilesHandler"
import {Constants as appConstants} from "../../src/SearchService/utils/Constants"

import {TestData} from "./utils/TestData"
import {Secrets} from "./secrets/secrets"
import {Constants} from "./utils/Constants"
import {Commons} from "./utils/Commons"

describe('DeleteProfilesHandler', function() {
  let event = TestData.defaultEvent

  before(Commons.setUpProfilesTestEnvironment)
  beforeEach(async function(){
    event.body = TestData.profile
    event.path.id = uuidv4()
    let response = await createFun(event)
    if(response.statusCode === OK.valueOf()) {
      console.log("[INFO]: Successfully created test record")
      event.path.id = response.data["_id"]
    } else {
      throw new Error("[Error]: Unable to perform pre-test action")
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
      .with.equal(`${Secrets.ENVIRONMENT}.${Constants.PROFILES}`)

    expect(response.data)
      .to.have.property("_type")
      .with.equal(appConstants.ES_DOCTYPES._DOC)

    expect(response.data)
      .to.have.property("result")
      .with.equal("deleted")
  })
})

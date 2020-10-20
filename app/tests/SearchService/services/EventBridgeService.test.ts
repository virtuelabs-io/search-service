import {expect} from "chai"

import {EventBridgeService} from "../../../src/SearchService/services/EventBridgeService"
import {Constants as appConstants} from "../../../src/SearchService/utils/Constants"

import {Commons} from "../utils/Commons"
import {TestData} from "../utils/TestData";


describe('EventBridgeService', function() {
  before(Commons.setUpGigsTestEnvironment)

  it('Config Test', async function() {
    let messageService = new EventBridgeService(appConstants.BUS.SOURCES.GIG, appConstants.BUS.DETAIL_TYPES.PUBLISHED)
    messageService.entryDetail = TestData.gig
    const config = messageService.entry

    expect(config)
      .to.have.property("Source")
      .with.equal(appConstants.BUS.SOURCES.GIG)

    expect(config)
      .to.have.property("DetailType")
      .with.equal(appConstants.BUS.DETAIL_TYPES.PUBLISHED)

    expect(config)
      .to.have.property("EventBusName")
      .with.equal(process.env.BUS_NAME)

    expect(config)
      .to.have.property("Time")

    expect(config)
      .to.have.property("Detail")
      .with.equal(JSON.stringify(TestData.gig))
  })

  it('Publish Test', async function() {
    let messageService = new EventBridgeService(appConstants.BUS.SOURCES.GIG, appConstants.BUS.DETAIL_TYPES.PUBLISHED)
    messageService.entryDetail = TestData.gig
    let response = await messageService.publish()
    expect(response)
      .to.have.property("Entries")
      .to.have.length(1)
  })
})

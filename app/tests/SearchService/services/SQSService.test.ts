import {expect} from "chai"

import {SQSService} from "../../../src/SearchService/services/SQSService"
import {Constants as appConstants} from "../../../src/SearchService/utils/Constants"

import {Commons} from "../utils/Commons"
import {TestData} from "../utils/TestData";


describe('SQSService', function() {
  before(Commons.setUpGigsTestEnvironment)

  it('Config Test', async function() {
    let messageService = new SQSService()
    messageService.messageConfigBody = TestData.gig
    const config = messageService.messageConfig

    expect(config)
      .to.have.property("DelaySeconds")
      .with.equal(appConstants.SQS.DELAY_SECONDS)

    expect(config)
      .to.have.property("MessageAttributes")
      .to.have.property("Author")
      .to.have.property("StringValue")
      .with.equal(appConstants.SQS.MESSAGE_AUTHOR)

    expect(config)
      .to.have.property("MessageAttributes")
      .to.have.property("WeeksOn")
      .to.have.property("StringValue")
      .with.equal(appConstants.SQS.MESSAGE_RETENTION)

    expect(config)
      .to.have.property("MessageBody")
      .with.equal(JSON.stringify(TestData.gig))

    expect(config)
      .to.have.property("QueueUrl")
      .with.equal(process.env.SQS_QUEUE)
  })

  it('Publish Test', async function() {
    let messageService = new SQSService()
    messageService.messageConfigBody = TestData.gig
    let response = await messageService.publish()

    expect(response)
      .to.have.property("MessageId")
  })
})

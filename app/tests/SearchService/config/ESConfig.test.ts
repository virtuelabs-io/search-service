import {expect} from "chai"

import {ESConfig} from "../../../src/SearchService/config/ESConfig"
import {Constants as appConstants} from "../../../src/SearchService/utils/Constants"

import {Secrets} from "../secrets/secrets"
import {Constants} from "../utils/Constants"
import {Commons} from "../utils/Commons"

describe('ESConfig', function() {
  before(Commons.setUpGigsTestEnvironment)

  it('Test No Arg Constructor', function() {
    const esConfig = new ESConfig()

    expect(esConfig.docType)
      .to.be.a(Constants.STRING)

    expect(esConfig.docType)
      .to.equal(appConstants.ES_DOCTYPES._DOC)

    expect(esConfig.domain)
      .to.be.a(Constants.STRING)

    expect(esConfig.domain)
      .to.equal(Secrets.DOMAIN)

    expect(esConfig.region)
      .to.be.a(Constants.STRING)

    expect(esConfig.region)
      .to.equal(Secrets.FUNC_REGION)

    expect(esConfig.index)
      .to.be.a(Constants.STRING)

    expect(esConfig.index)
      .to.equal(`${Secrets.ENVIRONMENT}.${Constants.GIGS}`)
  })

  it('Test All Args Constructor', function() {
    const esConfig = new ESConfig(
      Secrets.DOMAIN,
      Secrets.FUNC_REGION,
      `${Secrets.ENVIRONMENT}.${Constants.PROFILES}`,
      appConstants.ES_DOCTYPES._SEARCH
    )

    expect(esConfig.docType)
      .to.be.a(Constants.STRING)

    expect(esConfig.docType)
      .to.equal(appConstants.ES_DOCTYPES._SEARCH)

    expect(esConfig.domain)
      .to.be.a(Constants.STRING)

    expect(esConfig.domain)
      .to.equal(Secrets.DOMAIN)

    expect(esConfig.region)
      .to.be.a(Constants.STRING)

    expect(esConfig.region)
      .to.equal(Secrets.FUNC_REGION)

    expect(esConfig.index)
      .to.be.a(Constants.STRING)

    expect(esConfig.index)
      .to.equal(`${Secrets.ENVIRONMENT}.${Constants.PROFILES}`)
  })

  it('Test setters', function() {
    const esConfig = new ESConfig()

    esConfig.index = Constants.INDEX
    esConfig.region = Constants.REGION
    esConfig.domain = Constants.DOMAIN
    esConfig.docType = Constants.DOCTYPE

    expect(esConfig.docType)
      .to.be.a(Constants.STRING)

    expect(esConfig.docType)
      .to.equal(Constants.DOCTYPE)

    expect(esConfig.domain)
      .to.be.a(Constants.STRING)

    expect(esConfig.domain)
      .to.equal(Constants.DOMAIN)

    expect(esConfig.region)
      .to.be.a(Constants.STRING)

    expect(esConfig.region)
      .to.equal(Constants.REGION)

    expect(esConfig.index)
      .to.be.a(Constants.STRING)

    expect(esConfig.index)
      .to.equal(Constants.INDEX)
  })
})

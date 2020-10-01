import {Constants} from "../utils/Constants";

export class ESConfig {
  private _domain: string
  private _region: string
  private _index: string
  private _docType: string

  constructor(
    domain: string = process.env.DOMAIN!,
    region: string = process.env.FUNC_REGION!,
    index: string = process.env.ES_INDEX!,
    docType: string = Constants.ES_DOCTYPES._DOC,
    ) {
    this._domain = domain
    this._region = region
    this._index = index
    this._docType = docType
  }

  get domain(): string {
    return this._domain
  }

  set domain(domain){
    this._domain = domain
  }

  get region(): string {
    return this._region
  }

  set region(region){
    this._region = region
  }

  get index(): string {
    return this._index
  }

  set index(index){
    this._index = index
  }

  get docType(): string {
    return this._docType
  }

  set docType(docType){
    this._docType = docType
  }
}

import {Secrets} from "../secrets/secrets";
import {Constants} from "./Constants";

export class Commons {

  static setUpGigsTestEnvironment = function () {
    process.env.DOMAIN = Secrets.DOMAIN
    process.env.FUNC_REGION = Secrets.FUNC_REGION
    process.env.ES_INDEX = `${Secrets.ENVIRONMENT}.${Constants.GIGS}`
    process.env.AWS_ACCESS_KEY_ID = Secrets.AWS_ACCESS_KEY_ID
    process.env.AWS_SECRET_ACCESS_KEY = Secrets.AWS_SECRET_ACCESS_KEY
    process.env.SQS_QUEUE = Secrets.SQS.gigsURL
  }

  static setUpReviewsTestEnvironment = function () {
    process.env.DOMAIN = Secrets.DOMAIN
    process.env.FUNC_REGION = Secrets.FUNC_REGION
    process.env.ES_INDEX = `${Secrets.ENVIRONMENT}.${Constants.REVIEWS}`
    process.env.AWS_ACCESS_KEY_ID = Secrets.AWS_ACCESS_KEY_ID
    process.env.AWS_SECRET_ACCESS_KEY = Secrets.AWS_SECRET_ACCESS_KEY
    process.env.SQS_QUEUE = Secrets.SQS.reviewsURL
  }

  static setUpProfilesTestEnvironment = function () {
    process.env.DOMAIN = Secrets.DOMAIN
    process.env.FUNC_REGION = Secrets.FUNC_REGION
    process.env.ES_INDEX = `${Secrets.ENVIRONMENT}.${Constants.PROFILES}`
    process.env.AWS_ACCESS_KEY_ID = Secrets.AWS_ACCESS_KEY_ID
    process.env.AWS_SECRET_ACCESS_KEY = Secrets.AWS_SECRET_ACCESS_KEY
    process.env.SQS_QUEUE = Secrets.SQS.profilesURL
  }
}

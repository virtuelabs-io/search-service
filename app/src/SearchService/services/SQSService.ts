import * as AWS from 'aws-sdk'

import {Constants} from "../utils/Constants";


export class SQSService {
  private _sqs: AWS.SQS
  private _queueURL: string
  private _messageConfig: any

  constructor(queueURL: string = process.env.SQS_QUEUE!, region: string = process.env.FUNC_REGION!) {
    AWS.config.update({region: region})
    this._sqs = new AWS.SQS({apiVersion: Constants.SQS.API_VERSION})
    this._queueURL = queueURL
    this._messageConfig = {
      DelaySeconds: Constants.SQS.DELAY_SECONDS,
      MessageAttributes: {
        "Author": {
          DataType: "String",
          StringValue: Constants.SQS.MESSAGE_AUTHOR
        },
        "WeeksOn": {
          DataType: "Number",
          StringValue: Constants.SQS.MESSAGE_RETENTION
        }
      },
      MessageBody: JSON.stringify({}),
      QueueUrl: this._queueURL
    }
  }

  get messageConfig(): any{
    return this._messageConfig
  }

  set messageConfigBody(message: any) {
    this._messageConfig.MessageBody = JSON.stringify(message)
  }

  public async publish() {
    let response = await this._sqs.sendMessage(this._messageConfig).promise()
    if(response) {
      console.log(`${Constants.LOG_LEVEL.INFO}: successfully queued ID: ${response.MessageId}`);
    } else {
      console.log(`${Constants.LOG_LEVEL.ERROR}: message queuing failed`);
    }
    return response
  }
}

[![Build Status](https://dev.azure.com/VirtueLabs/SerCart/_apis/build/status/virtuelabs-io.search-service?branchName=master)](https://dev.azure.com/VirtueLabs/SerCart/_build/latest?definitionId=1&branchName=master)
# Search Service

This application is responsible for search related queries and all CRUD operations
on elastic search. It used `Amazon Elasticsearch Service` as its persistence.  

## Infrastructure

- [AWS Elastic Search Service](https://aws.amazon.com/elasticsearch-service/)
- [SQS Queues](https://aws.amazon.com/sqs/)
- [Cognito](https://aws.amazon.com/cognito/)
- [Dev Ops User with necessary privileges](./serverless.yml)

> Note: You can find cloudformation templates for all of these resources [here](https://github.com/virtuelabs-io/IaC)

### Cognito

You can use the [Cognito Cloud Formation](https://github.com/virtuelabs-io/IaC/blob/master/cf/auth/customer-cognito.yaml)
template to provision necessary resources

### Elastic Search

You can use the [Elastic Search Cloud Formation](https://github.com/virtuelabs-io/IaC/blob/master/cf/search/elastic-search.yaml)
template to provision necessary resources

### SQS Queues

The following queues are used for inter service communication.

- Gig Created Queue
- Review Given Queue
- Profile Created Queue

> Note: Each queue has an DLQ configured. 
> You can find more details of the config [here](https://github.com/virtuelabs-io/IaC/blob/master/cf/messaging/sqs.yaml)

## API's Available

### Gigs
  - `POST` : https://gateway-id.execute-api.ap-south-1.amazonaws.com/stage/api/v1/gigs
  - `PUT` : https://gateway-id.execute-api.ap-south-1.amazonaws.com/stage/api/v1/gigs/{id}
  - `DELETE` : https://gateway-id.execute-api.ap-south-1.amazonaws.com/stage/api/v1/gigs/{id}
  - `GET` : https://gateway-id.execute-api.ap-south-1.amazonaws.com/stage/api/v1/gigs/{id}
  - `POST` : https://gateway-id.execute-api.ap-south-1.amazonaws.com/stage/api/v1/gigs/publish/{id}
  - `POST` : https://gateway-id.execute-api.ap-south-1.amazonaws.com/stage/api/v1/gigs/unpublish/{id}
  - `POST` : https://gateway-id.execute-api.ap-south-1.amazonaws.com/stage/api/v1/gigs

### Profiles
  - `POST` : https://gateway-id.execute-api.ap-south-1.amazonaws.com/stage/api/v1/profiles/{id}
  - `PUT` : https://gateway-id.execute-api.ap-south-1.amazonaws.com/stage/api/v1/profiles/{id}
  - `DELETE` : https://gateway-id.execute-api.ap-south-1.amazonaws.com/stage/api/v1/profiles/{id}
  - `GET` : https://gateway-id.execute-api.ap-south-1.amazonaws.com/stage/api/v1/profiles/{id}

### Reviews
  - `POST` - https://gateway-id.execute-api.ap-south-1.amazonaws.com/stage/api/v1/reviews
  - `PUT` - https://gateway-id.execute-api.ap-south-1.amazonaws.com/stage/api/v1/reviews/{id}
  - `DELETE` - https://gateway-id.execute-api.ap-south-1.amazonaws.com/stage/api/v1/reviews/{id}
  - `GET` - https://gateway-id.execute-api.ap-south-1.amazonaws.com/stage/api/v1/reviews/{id}
  - `POST` - https://gateway-id.execute-api.ap-south-1.amazonaws.com/stage/api/v1/reviews

# Build and deploy 

```sh
# To deploy
serverless deploy --stage staging --aws-profile <profile name>
# To delete
serverless remove --stage staging --aws-profile <profile name>
```

> **Note**: Authenticated with Cognito

## Creating Elastic Search Indexes

Setup environment
```bash
export ENDPOINT=https://yourendpoint.com
export ENV=stage
export INDEX=someindex
```

Create indexes 
```bash
curl -XPUT ${ENDPOINT}/${ENV}.${INDEX} \
    --header 'Content-Type: application/json' \
    --data-binary @es/${INDEX}.index.settings.json
```

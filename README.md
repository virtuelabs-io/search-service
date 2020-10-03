[![Build Status](https://dev.azure.com/VirtueLabs/SerCart/_apis/build/status/virtuelabs-io.search-service?branchName=master)](https://dev.azure.com/VirtueLabs/SerCart/_build/latest?definitionId=1&branchName=master)
[![Coverage](https://img.shields.io/azure-devops/coverage/Virtuelabs/SerCart/1?style=social)](https://img.shields.io/azure-devops/coverage/Virtuelabs/SerCart/1?style=social)
# Search Service

This application is responsible for search related queries and all CRUD operations
on elastic search. It used `Amazon Elasticsearch Service` as its persistence.  

## API's Available

### Gigs
  - `POST` : https://gateway-id.execute-api.ap-south-1.amazonaws.com/stage/api/v1/gigs
  - `PUT` : https://gateway-id.execute-api.ap-south-1.amazonaws.com/stage/api/v1/gigs/{id}
  - `DELETE` : https://gateway-id.execute-api.ap-south-1.amazonaws.com/stage/api/v1/gigs/{id}
  - `GET` : https://gateway-id.execute-api.ap-south-1.amazonaws.com/stage/api/v1/gigs/{id}
  - `POST` : https://gateway-id.execute-api.ap-south-1.amazonaws.com/stage/api/v1/gigs/publish/{id}
  - `POST` : https://gateway-id.execute-api.ap-south-1.amazonaws.com/stage/api/v1/gigs/unpublish/{id}
  - `GET` : https://gateway-id.execute-api.ap-south-1.amazonaws.com/stage/api/v1/gigs

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
  - `GET` - https://gateway-id.execute-api.ap-south-1.amazonaws.com/stage/api/v1/reviews

# Build and deploy 

```sh
# To deploy
serverless deploy --stage staging --aws-profile <profile name>
# To delete
serverless remove --stage staging --aws-profile <profile name>
```

> **Note**: Authenticated with Cognito

## Creating Indexes

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

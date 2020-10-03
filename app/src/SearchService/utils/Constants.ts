export class Constants {
  static ES = "es"

  static LOG_LEVEL = {
    ERROR: "[ERROR]",
    INFO: "[INFO]"
  }

  static ES_DOCTYPES = {
    _DOC: "_doc",
    _UPDATE: "_update",
    _SEARCH: "_search"
  }

  static HTTP_METHOD = {
    GET: "GET",
    DELETE: "DELETE",
    PUT: "PUT",
    POST:"POST"
  }

  static PATH_SEPARATOR = "/"

  static HTTP_HEADERS = {
    HOST: "host",
    CONTENT_TYPE: "Content-Type",
    CONTENT_LENGTH: "Content-Length"
  }

  static CONTENT_TYPE_APP_JSON = "application/json"

  static SQS = {
    MESSAGE_RETENTION: "7",
    MESSAGE_AUTHOR: "lambda",
    API_VERSION: "2012-11-05",
    DELAY_SECONDS: 5
  }
}

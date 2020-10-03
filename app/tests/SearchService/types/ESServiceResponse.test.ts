import {assert} from "chai"

import {ESServiceResponse} from "../../../src/SearchService/types/ESServiceResponse";

describe('ESServiceResponse', function() {

  it('Type Check', async function() {
    const isOfCorrectType = {
      statusCode: 200,
      message: "OK",
      data: { SomeKey: "SomeValue"}
    };

    assert(isOfCorrectType as ESServiceResponse)
  });
});

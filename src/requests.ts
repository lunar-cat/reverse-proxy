import { BlockedRequest, ModifiedRequest, TestBody, TestResponse } from './types';

export const blockedRequests: BlockedRequest[] = [
  {
    description: 'Test',
    method: ['POST'],
    url: /test$/,
    active: false
  }
];

export const modifiedRequests: ModifiedRequest[] = [
  {
    description: 'Example with Local API',
    method: ['GET'],
    url: /test$/,
    active: true,
    modifyFunction: (body: TestResponse<TestBody>) => {
      body.data = { info: "Hardcoded Error Message" };
      body.success = false;
      return body;
    }
  }
];
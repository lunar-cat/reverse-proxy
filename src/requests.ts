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
    description: 'Test',
    method: ['GET'],
    url: /test$/,
    active: false,
    modifyFunction: (body: TestResponse<TestBody>) => {
      return body;
    }
  }
];
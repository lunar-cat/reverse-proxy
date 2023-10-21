export interface BlockedRequest {
  description: string;
  method: string[];
  url: RegExp;
  active: boolean;
}

export interface ModifiedRequest {
  description: string;
  method: string[];
  url: RegExp;
  active: boolean;
  modifyFunction: (body: any) => any;
}

export interface TestResponse<T> {
  message: string;
  success: boolean;
  data?: T;
}

export interface TestBody {
  prop: number;
}
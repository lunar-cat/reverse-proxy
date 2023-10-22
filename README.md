# Reverse Proxy

> This project is a reverse proxy written in TypeScript. It can be used to block requests and modify requests.

> I created this project, because at my current job the server does not have hot swapping and each modification took me between 1 or 2 minutes of waiting for the server to reload. Therefore, it is easier for me to modify or block requests from my reverse-proxy.

> It's only intended to use on local development, and have a lot of room for improvement.

## Features:

**Block requests** based on their method, URL, and other criteria.

**Modify requests** before they are forwarded to the backend server.

## Installation:

To install the project, clone the repository:

`git clone https://github.com/lunar-cat/reverse-proxy.git`

Then, install the dependencies:

`npm install`

## Usage:

To start the proxy server, run the following command:

`npm run dev`

The proxy server will listen on port 8081 by default. You can change the port by setting the `PROXY_PORT` variable.

## Configuration:

The proxy server can be configured using the `requests.ts` file. This file contains two arrays: **blockedRequests** and **modifiedRequests**.

The **blockedRequests** array contains an array of objects that represent blocked requests. Each object must have the following properties:

    description: A description of the blocked request.
    method: An array of HTTP methods that are blocked.
    url: A regular expression that matches the URLs of blocked requests.
    active: A boolean value that indicates whether the blocked request is active.

The modifiedRequests array contains an array of objects that represent modified requests. Each object must have the following properties:

    description: A description of the modified request.
    method: An array of HTTP methods that are modified.
    url: A regular expression that matches the URLs of modified requests.
    active: A boolean value that indicates whether the modified request is active.
    modifyFunction: A function that is used to modify the body of the request before it is forwarded to the backend server.

## Example:

The following example shows how to create a blocked request and a modified request:

```ts
export const blockedRequests: BlockedRequest[] = [
  {
    description: 'Test',
    method: ['POST'],
    url: /test$/,
    active: false
  }
];
```
```ts
export const modifiedRequests: ModifiedRequest[] = [
  {
    description: 'Test',
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
```
The blocked request will block all POST requests to the /test endpoint. The modified request will modify the response body of all GET requests to the /test endpoint.

import http from 'http';

const ERROR_DELAY_MS = 2000;
const ERROR_HTTP_CODE = 400;
const ERROR_RESPONSE = { success: false, message: 'Custom Error Message' };

export const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const handleBloquedRequest = async (response: http.ServerResponse) => {
  await wait(ERROR_DELAY_MS);
  response.writeHead(ERROR_HTTP_CODE, { 'Content-Type': 'application-json' });
  response.end(ERROR_RESPONSE);
};

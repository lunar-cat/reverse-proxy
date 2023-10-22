import http from 'http';
import { blockedRequests, modifiedRequests } from './requests';
import { handleBloquedRequest } from './utils';

const TARGET_HOST = 'localhost';
const TARGET_PORT = 8080;
const PROXY_PORT = 8081;

const proxyServer = http.createServer(async (req, res) => {
  const { method, url, headers } = req;
  if (!url || !method) {
    return;
  }

  const isBloquedEndpoint = blockedRequests
    .filter(r => r.active)
    .some(request => request.url.test(url) && request.method.includes(method.toUpperCase()));

  if (isBloquedEndpoint) {
    await handleBloquedRequest(res);
    return;
  }

  const modifiedRequest = modifiedRequests
    .filter(r => r.active)
    .find(request => request.url.test(url) && request.method.includes(method.toUpperCase()));

  const options: http.RequestOptions = {
    hostname: TARGET_HOST,
    port: TARGET_PORT,
    path: url, method, headers
  }

  const proxyReq = http.request(options, (proxyRes) => {
    if (modifiedRequest) {
      let body = Buffer.from('');
      proxyRes.on('data', (chunk) => body = Buffer.concat([body, chunk]));
      proxyRes.on('end', () => {
        let responseBody = JSON.parse(body.toString());
        let modifiedBody = JSON.stringify(modifiedRequest.modifyFunction(responseBody));

        res.setHeader('Content-Length', Buffer.byteLength(modifiedBody));
        res.writeHead(proxyRes.statusCode || 200, { "Content-Type": "application/json" });
        res.end(modifiedBody);
      });
    } else {
      res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
      proxyRes.pipe(res);
    }
  });

  req.pipe(proxyReq);
});


proxyServer.listen(PROXY_PORT, () => {
  console.log(`LISTENING PORT: ${PROXY_PORT}`);
});
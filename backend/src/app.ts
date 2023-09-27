import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import httpRouterHandler from '@middy/http-router';
import { routes } from './app-router';

export const handler = middy()
  .use(httpHeaderNormalizer())
  .handler(httpRouterHandler(routes))
  .use(jsonBodyParser())
  .use(httpErrorHandler());

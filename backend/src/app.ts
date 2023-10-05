import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import httpRouterHandler from '@middy/http-router';
import { routes } from './app-router';
import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import { logger } from './logger';

export const handler = middy()
  .use(injectLambdaContext(logger))
  .use(httpHeaderNormalizer())
  .handler(httpRouterHandler(routes))
  .use(httpErrorHandler());

import { APIGatewayProxyHandler } from 'aws-lambda';
import { logger } from '../logger';

export const GetBroadcastersHandler: APIGatewayProxyHandler = async (event) => {
  logger.debug(JSON.stringify(event));
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World!',
    }),
  };
};

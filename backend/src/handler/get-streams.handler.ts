import { APIGatewayProxyHandler } from 'aws-lambda';
import { GetStreamListUsecase } from '../usecase/stream/get-stream-list.usecase';

export const GetStreamsHandler: APIGatewayProxyHandler = async (event) => {
  const usecase = new GetStreamListUsecase();

  if (!event.queryStringParameters) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'broadcasterId is required',
      }),
    };
  }

  const broadcasterId = event.queryStringParameters['broadcasterId'];
  const nextToken = event.queryStringParameters['nextToken'];

  if (!broadcasterId) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'broadcasterId is required',
      }),
    };
  }

  const result = await usecase.run({ broadcasterId, nextToken });

  return {
    statusCode: 200,
    body: JSON.stringify(result),
    headers: {
      'cache-control': 'max-age=60',
    },
  };
};

import { APIGatewayProxyHandler } from 'aws-lambda';
import { GetBroadcasterUsecase } from '../usecase/broadcaster/get-broadcaster.usecase';

export const GetBroadcasterHandler: APIGatewayProxyHandler = async (event) => {
  const usecase = new GetBroadcasterUsecase();
  const broadcasterId = event.pathParameters
    ? event.pathParameters['broadcasterId']
    : undefined;

  if (!broadcasterId) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'broadcasterId is required',
      }),
    };
  }

  const broadcaster = await usecase.run(broadcasterId);

  if (!broadcaster) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: 'broadcaster not found',
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(broadcaster),
    headers: {
      'cache-control': 'max-age=60',
    },
  };
};

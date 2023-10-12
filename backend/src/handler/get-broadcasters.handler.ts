import { APIGatewayProxyHandler } from 'aws-lambda';
import { GetBroadcasterListUsecase } from '../usecase/broadcaster/get-broadcaster-list.usecase';

export const GetBroadcastersHandler: APIGatewayProxyHandler = async (event) => {
  const usecase = new GetBroadcasterListUsecase();
  const nextToken = event.queryStringParameters
    ? event.queryStringParameters['nextToken']
    : undefined;

  const result = await usecase.run({ nextToken });

  return {
    statusCode: 200,
    body: JSON.stringify(result),
    headers: {
      'cache-control': 'max-age=60',
    },
  };
};

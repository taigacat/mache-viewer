import { APIGatewayProxyHandler } from 'aws-lambda';
import { GetGiftListUsecase } from '../usecase/gift/get-gift-list.usecase';

export const GetGiftsHandler: APIGatewayProxyHandler = async (event) => {
  const usecase = new GetGiftListUsecase();
  if (!event.queryStringParameters) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'streamId is required',
      }),
    };
  }

  const streamId = event.queryStringParameters['streamId'];
  const start = event.queryStringParameters['start'];
  const nextToken = event.queryStringParameters['nextToken'];

  if (!streamId) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'streamId is required',
      }),
    };
  }

  const response = await usecase.run({
    streamId,
    start: start ? parseInt(start) : undefined,
    nextToken,
  });

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

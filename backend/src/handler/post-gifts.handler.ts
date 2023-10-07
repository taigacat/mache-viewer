import { APIGatewayProxyHandler } from 'aws-lambda';
import { RegisterGiftUsecase } from '../usecase/register-gift.usecase';
import { Gift } from '../domain/model/gift';

export const PostGiftsHandler: APIGatewayProxyHandler = async (event) => {
  const usecase = new RegisterGiftUsecase();

  const request: {
    broadcaster_id: string;
    broadcaster_name: string;
    stream_id: string;
    gifts: {
      all: Gift[];
      diff: Gift[];
    };
  } = JSON.parse(event.body ?? '{}');

  await usecase.run({
    broadcaster:
      request.gifts.all && request.gifts.all.length > 0
        ? {
            id: request.broadcaster_id,
            name: request.broadcaster_name,
          }
        : undefined,
    stream:
      request.gifts.all && request.gifts.all.length > 0
        ? {
            broadcasterId: request.broadcaster_id,
            id: request.stream_id,
          }
        : undefined,
    gifts:
      request.gifts.all && request.gifts.all.length > 0
        ? request.gifts.all.map((gift) => ({
            ...gift,
            streamId: request.stream_id,
          }))
        : request.gifts.diff.map((gift) => ({
            ...gift,
            streamId: request.stream_id,
          })),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World!',
    }),
  };
};

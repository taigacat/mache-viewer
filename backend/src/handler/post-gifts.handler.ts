import { APIGatewayProxyHandler } from 'aws-lambda';
import { RegisterGiftUsecase } from '../usecase/gift/register-gift.usecase';
import { Gift } from '../domain/model/gift';

export const PostGiftsHandler: APIGatewayProxyHandler = async (event) => {
  const usecase = new RegisterGiftUsecase();

  const request: {
    broadcasterId: string;
    broadcasterName: string;
    streamId: string;
    gifts: {
      all: Gift[];
      diff: Gift[];
    };
  } = JSON.parse(event.body ?? '{}');

  await usecase.run({
    broadcaster:
      request.gifts.all && request.gifts.all.length > 0
        ? {
            id: request.broadcasterId,
            name: request.broadcasterName,
          }
        : undefined,
    stream:
      request.gifts.all && request.gifts.all.length > 0
        ? {
            broadcasterId: request.broadcasterId,
            id: request.streamId,
          }
        : undefined,
    gifts:
      request.gifts.all && request.gifts.all.length > 0
        ? request.gifts.all.map((gift) => ({
            ...gift,
            streamId: request.streamId,
          }))
        : request.gifts.diff.map((gift) => ({
            ...gift,
            streamId: request.streamId,
          })),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World!',
    }),
  };
};

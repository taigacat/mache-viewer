import { Route } from '@middy/http-router';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { PostGiftsHandler } from './handler/post-gifts.handler';
import { GetGiftsHandler } from './handler/get-gifts.handler';
import { GetBroadcasterHandler } from './handler/get-broadcaster.handler';
import { GetStreamsHandler } from './handler/get-streams.handler';
import { GetBroadcastersHandler } from './handler/get-broadcasters.handler';

export const routes: Array<Route<APIGatewayProxyEvent>> = [
  {
    method: 'GET',
    path: '/broadcasters',
    handler: GetBroadcastersHandler,
  },
  {
    method: 'GET',
    path: '/broadcasters/{broadcasterId}',
    handler: GetBroadcasterHandler,
  },
  {
    method: 'GET',
    path: '/streams',
    handler: GetStreamsHandler,
  },
  {
    method: 'GET',
    path: '/gifts',
    handler: GetGiftsHandler,
  },
  {
    method: 'POST',
    path: '/gifts',
    handler: PostGiftsHandler,
  },
];

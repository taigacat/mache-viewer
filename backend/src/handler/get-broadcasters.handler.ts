import { APIGatewayProxyHandler } from 'aws-lambda';

export const GetBroadcastersHandler: APIGatewayProxyHandler = async (event) => {
  console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World!',
    }),
  };
};

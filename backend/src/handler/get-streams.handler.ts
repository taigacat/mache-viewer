import { APIGatewayProxyHandler } from 'aws-lambda';

export const GetStreamsHandler: APIGatewayProxyHandler = async (event) => {
  console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World!',
    }),
  };
};

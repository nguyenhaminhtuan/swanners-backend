import {
  APIGatewayAuthorizerHandler,
  APIGatewayAuthorizerResult,
} from 'aws-lambda';
import { getToken, verifyToken } from './utils/auth';

function generatePolicy(
  principalId: string,
  effect: string,
  resource: string
): APIGatewayAuthorizerResult {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17', // default version
      Statement: [
        {
          Action: 'execute-api:Invoke', // default action
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };
}

const authorizer: APIGatewayAuthorizerHandler = async (event) => {
  if (!event.type || event.type !== 'TOKEN') {
    throw new Error('Expected "event.type" parameter to have value "TOKEN"');
  }

  const tokenString = event.authorizationToken;

  if (!tokenString) {
    throw new Error('Missing authorization header');
  }

  const token = getToken(tokenString);
  const payload = await verifyToken(token);
  return generatePolicy(payload.sub, 'Allow', event.methodArn);
};

export default authorizer;

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

export const handler: APIGatewayAuthorizerHandler = async (event) => {
  if (!event.type || event.type !== 'TOKEN') {
    return generatePolicy('user', 'Deny', event.methodArn);
  }

  const tokenString = event.authorizationToken;

  if (!tokenString) {
    return generatePolicy('user', 'Deny', event.methodArn);
  }

  const token = getToken(tokenString);
  const payload = await verifyToken(token);
  return generatePolicy(payload.sub, 'Allow', event.methodArn);
};

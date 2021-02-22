import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import util from 'util';
import env from '../config/env';

const client = jwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 10,
  jwksUri: `${env.auth.issuer}/.well-known/jwks.json`,
});

export function getToken(tokenString: string) {
  const match = tokenString.match(/^Bearer (.*)$/);

  if (!match || match.length < 2) {
    throw new Error('Invalid token type');
  }

  return match[1];
}

export async function verifyToken(token: string) {
  const decoded = jwt.decode(token, { complete: true }) as any;

  if (!decoded || !decoded.header || !decoded.header.kid) {
    throw new Error('Invalid token');
  }

  const getSigningKey = util.promisify(client.getSigningKey);
  const signingKey = await getSigningKey(decoded.header.kid);
  const publicKey = signingKey.getPublicKey();

  const payload = jwt.verify(token, publicKey, {
    issuer: env.auth.issuer,
    algorithms: ['RS256'],
  }) as any;

  return payload;
}

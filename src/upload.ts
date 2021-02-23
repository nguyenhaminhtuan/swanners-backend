import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { APIGatewayProxyHandler, S3Handler } from 'aws-lambda';
import env from './config/env';

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  signatureVersion: 'v4',
});

export const getSignedURL: APIGatewayProxyHandler = async (event) => {
  try {
    const { sub: userId } = (event.requestContext.authorizer as any).claims;
    const key = `${userId}/${uuid()}.jpg`;

    const url = await s3.getSignedUrlPromise('putObject', {
      Bucket: env.bucket,
      ContentType: 'image/jpeg',
      Key: key,
      Expires: 300,
      ACL: 'public-read',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ key, url }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

export const resizeImage: S3Handler = () => {
  return;
};

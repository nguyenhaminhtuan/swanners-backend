import AWS from 'aws-sdk';
import uuid from 'uuid';
import { APIGatewayProxyHandler } from 'aws-lambda';

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  signatureVersion: 'v4',
});

const getSignUrl: APIGatewayProxyHandler = async (event) => {
  try {
    const { sub: userId } = (event.requestContext.authorizer as any).claims;
    const key = `${userId}/${uuid.v4()}.jpg`;

    const url = await s3.getSignedUrlPromise('putObject', {
      Bucket: process.env.S3_BUCKET,
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

export default getSignUrl;

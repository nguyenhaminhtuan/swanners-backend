const env = {
  isProd: process.env.NODE_ENV === 'production',
  auth: {
    issuer: process.env.AUTH_ISSUER || '',
  },
  region: process.env.AWS_REGION || 'ap-southeast1',
  bucket: process.env.S3_BUCKET || '',
  userPool: process.env.COGNITO_USER_POOL || '',
};

export default env;

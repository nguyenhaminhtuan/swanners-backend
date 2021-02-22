const env = {
  isProd: process.env.NODE_ENV === 'production',
  auth: {
    issuer: process.env.COGNITO_URL || '',
  },
};

export default env;

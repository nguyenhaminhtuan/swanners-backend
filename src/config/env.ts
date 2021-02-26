const env = {
  isProd: process.env.NODE_ENV === 'production',
  auth: {
    issuer: process.env.AUTH_ISSUER || '',
  },
  region: process.env.AWS_REGION || 'ap-southeast1',
  bucket: {
    public: process.env.PUBLIC_BUCKET || '',
    private: process.env.PRIVATE_BUCKET || '',
  },
  databaseURL: process.env.DATABASE_URL || '',
};

export default env;

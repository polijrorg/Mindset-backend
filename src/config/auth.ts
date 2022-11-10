export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '1d',
    forgotSecret: process.env.FORGOT_SECRET || 'forgot',
    forgotExpiresIn: '1h',
  },
};

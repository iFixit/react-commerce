module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'd8ea0029965dfd06dfd92608b1ee0eff'),
  },
});

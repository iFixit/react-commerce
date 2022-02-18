module.exports = ({ env }) => ({
  auth: {
    secret: env("JWT_SECRET"),
  },
});

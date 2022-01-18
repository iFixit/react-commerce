const setDefaultPermissions = require("./permissions");

module.exports = async function bootstrap({ strapi }) {
  try {
    await setDefaultPermissions(strapi);
  } catch (err) {
    strapi.log.error("💥 Error during bootstrap:", err);
  }
};

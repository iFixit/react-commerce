"use strict";
const createAdminUser = require("./seed/admin-users");
const seedContentTypes = require("./seed/content-types");

module.exports = async ({ strapi }) => {
  // bootstrap phase
  const shouldSeed = process.env.SEED_DB === "true";
  if (shouldSeed) {
    try {
      await createAdminUser(strapi);
      await seedContentTypes(strapi);
    } catch (err) {
      strapi.log.error("💥 Error while seeding database");
      strapi.log.error(err.message);
    }
  }
};

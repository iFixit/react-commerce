"use strict";
const seed = require("../../db/seed/index.js");
const permissionsConfig = require("../../db/permissions.json");

module.exports = async () => {
  await createAdminUser();
  await setDefaultPermissions();
  await seed();
};

async function findPublicRole() {
  const result = await strapi
    .query("role", "users-permissions")
    .findOne({ type: "public" });
  return result;
}

async function setDefaultPermissions() {
  const role = await findPublicRole();
  const permissions = await strapi
    .query("permission", "users-permissions")
    .find({ type: "application", role: role.id });
  await Promise.all(
    permissions
      .filter((p) => {
        const modelPermissions =
          permissionsConfig["public"][p.controller] || [];
        return modelPermissions.includes(p.action) && p.enabled === false;
      })
      .map((p) => {
        return strapi
          .query("permission", "users-permissions")
          .update({ id: p.id }, { enabled: true });
      })
  );
}

async function createAdminUser() {
  const params = {
    username: process.env.ADMIN_USER || "admin",
    password: process.env.ADMIN_PASS || "Password1",
    firstname: process.env.ADMIN_USER || "Admin",
    lastname: process.env.ADMIN_USER || "Admin",
    email: process.env.ADMIN_EMAIL || "strapi@ifixit.com",
    blocked: false,
    isActive: true,
  };
  //Check if any account exists.
  const admins = await strapi.query("user", "admin").find();

  if (admins.length === 0) {
    try {
      let tempPass = params.password;
      let verifyRole = await strapi
        .query("role", "admin")
        .findOne({ code: "strapi-super-admin" });
      if (!verifyRole) {
        verifyRole = await strapi.query("role", "admin").create({
          name: "Super Admin",
          code: "strapi-super-admin",
          description:
            "Super Admins can access and manage all features and settings.",
        });
      }
      params.roles = [verifyRole.id];
      params.password = await strapi.admin.services.auth.hashPassword(
        params.password
      );
      await strapi.query("user", "admin").create({
        ...params,
      });
      strapi.log.info("Admin account was successfully created.");
      strapi.log.info(`Email: ${params.email}`);
      strapi.log.info(`Password: ${tempPass}`);
    } catch (error) {
      strapi.log.error(
        `Couldn't create Admin account during bootstrap: `,
        error
      );
    }
  }
}

const permissionsConfig = require("./config.json");

const ROLE_UID = "plugin::users-permissions.role";
const PERMISSION_UID = "plugin::users-permissions.permission";

module.exports = async function setDefaultPermissions(strapi) {
  const roles = Object.keys(permissionsConfig);
  for (let i = 0; i < roles.length; i++) {
    const role = roles[i];
    await setPermissionsForRole(strapi, role);
  }
};

async function setPermissionsForRole(strapi, roleName) {
  strapi.log.info(`👨‍✈️ Setting permissions for role "${roleName}"`);
  const permissions = permissionsConfig[roleName];
  if (!permissions) {
    throw new Error(`No permissions found for role ${roleName}`);
  }
  let role = await strapi.db.query(ROLE_UID).findOne({
    where: { type: roleName },
    populate: { permissions: true },
  });
  if (role == null) {
    throw new Error(`No role found for role ${roleName}`);
  }
  const missingPermissions = permissions.filter((action) => {
    return !role.permissions.some((permission) => permission.action === action);
  });
  for (let i = 0; i < missingPermissions.length; i++) {
    const permission = missingPermissions[i];
    await strapi.db.query(PERMISSION_UID).create({
      data: {
        role: role.id,
        action: permission,
      },
    });
  }
}

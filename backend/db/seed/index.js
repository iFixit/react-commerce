const menus = require("./data/menus.json");
const stores = require("./data/stores.json");
const globalSettings = require("./data/global.json");

const idMap = {
  menu: {},
  store: {},
};

module.exports = async () => {
  const shouldSeed = process.env.SEED_DB === "true";
  if (shouldSeed) {
    strapi.log.info("Seed db..");
    try {
      // Seed menu
      const menuCount = await strapi.services.menu.count();
      if (menuCount === 0) {
        strapi.log.info("Create menus..");
        for (let i = 0; i < menus.length; i++) {
          const data = menus[i];
          const created = await strapi.services.menu.create(data);
          idMap.menu[data.id] = created.id;
        }
      } else {
        strapi.log.info("Skip menus seed");
      }

      // Seed stores
      const storeCount = await strapi.services.store.count();
      if (storeCount === 0) {
        strapi.log.info("Create stores..");
        for (let i = 0; i < stores.length; i++) {
          const data = stores[i];
          const created = await strapi.services.store.create({
            ...data,
            footer: {
              menu1: idMap.menu[data.footer.menu1],
              menu2: idMap.menu[data.footer.menu2],
              bottomMenu: idMap.menu[data.footer.bottomMenu],
              partners: idMap.menu[data.footer.partners],
            },
          });
          idMap.store[data.id] = created.id;
        }
      } else {
        strapi.log.info("Skip stores seed");
      }

      // Seed global settings
      strapi.log.info("Create global settings..");
      await strapi.services.global.createOrUpdate(globalSettings);
    } catch (error) {
      strapi.log.error(
        `Couldn't seed database during bootstrap: `,
        error.message
      );
      console.log(JSON.stringify(error, null, 2));
    }
  }
};

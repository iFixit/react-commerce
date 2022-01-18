const fs = require("fs");
const path = require("path");
const menus = require("./data/menus.json");
const stores = require("./data/stores.json");
const productLists = require("./data/product-lists.json");
const globalSettings = require("./data/global.json");

const MENU_UID = "api::menu.menu";
const STORE_UID = "api::store.store";
const PRODUCT_LIST_UID = "api::product-list.product-list";
const GLOBAL_SETTINGS_UID = "api::global.global";

const idMap = {
  menu: {},
  store: {},
  productLists: {},
};

module.exports = async (strapi) => {
  try {
    // Seed menus
    const menuCount = await strapi.db.query(MENU_UID).count();
    if (menuCount > 0) {
      strapi.log.info("🌱 Menus already exist, skipping");
    } else {
      strapi.log.info("🌱 Create menus..");
      for (let i = 0; i < menus.length; i++) {
        let data = menus[i];
        data.items = data.items.map((item) => {
          if (item.__component === "menu.submenu") {
            const mappedSubmenuId = idMap.menu[item.submenu];
            if (mappedSubmenuId == null) {
              throw new Error(
                `⚠️ Cannot find submenu with id ${item.submenu.id}`
              );
            }
            item.submenu = mappedSubmenuId;
          }
          return item;
        });
        const created = await strapi.entityService.create(MENU_UID, {
          data: data,
        });
        idMap.menu[data.id] = created.id;
      }
    }

    // Seed stores
    const storeCount = await strapi.db.query(STORE_UID).count();
    if (storeCount > 0) {
      strapi.log.info("🌱 Stores already exist, skipping");
    } else {
      strapi.log.info("🌱 Create stores..");
      for (let i = 0; i < stores.length; i++) {
        const data = stores[i];
        const created = await strapi.entityService.create(STORE_UID, {
          data: {
            ...data,
            footer: {
              menu1: idMap.menu[data.footer.menu1],
              menu2: idMap.menu[data.footer.menu2],
              bottomMenu: idMap.menu[data.footer.bottomMenu],
              partners: idMap.menu[data.footer.partners],
            },
            header: {
              menu: idMap.menu[data.header.menu],
            },
          },
        });
        idMap.store[data.id] = created.id;
      }
    }

    // Seed product lists
    const productListsCount = await strapi.db.query(PRODUCT_LIST_UID).count();
    if (productListsCount > 0) {
      strapi.log.info("🌱 Product lists already exist, skipping");
    } else {
      strapi.log.info("🌱 Create product lists..");
      for (let i = 0; i < productLists.length; i++) {
        const { image, parent, ...data } = productLists[i];
        const created = await strapi.entityService.create(PRODUCT_LIST_UID, {
          data: {
            ...data,
            publishedAt: new Date().toISOString(),
            parent: parent ? idMap.productLists[parent] : null,
          },
        });
        idMap.productLists[data.id] = created.id;
        if (image) {
          const entry = {
            id: created.id,
            model: PRODUCT_LIST_UID,
            field: "image",
          };
          await uploadEntryImage(entry, image);
        }
      }
    }

    // Seed global settings
    const globalSettingsCount = await strapi.db
      .query(GLOBAL_SETTINGS_UID)
      .count();
    if (globalSettingsCount > 0) {
      strapi.log.info("🌱 Global settings already exist, skipping");
    } else {
      strapi.log.info("🌱 Create global settings..");
      await strapi.entityService.create(GLOBAL_SETTINGS_UID, {
        data: globalSettings,
      });
    }
  } catch (error) {
    strapi.log.error(
      `Couldn't seed database during bootstrap: `,
      error.message
    );
  }
};

async function uploadEntryImage(entry, image) {
  const imagePath = path.join(
    __dirname,
    "data/images",
    `${image.hash}${image.ext}`
  );
  const fileStat = fs.statSync(imagePath);
  const attachment = await strapi.plugins.upload.services.upload.upload({
    data: {
      refId: entry.id,
      ref: entry.model,
      field: entry.field,
    },
    files: {
      path: imagePath,
      name: image.name,
      type: image.mime, // mime type
      size: fileStat.size,
    },
  });
  return attachment;
}

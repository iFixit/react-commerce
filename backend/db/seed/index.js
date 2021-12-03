const fs = require("fs");
const path = require("path");
const menus = require("./data/menus.json");
const stores = require("./data/stores.json");
const productLists = require("./data/product-lists.json");
const globalSettings = require("./data/global.json");

const idMap = {
  menu: {},
  store: {},
  productLists: {},
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
          let data = menus[i];
          data.items = data.items.map((item) => {
            if (item.__component === "menu.submenu") {
              const mappedSubmenuId = idMap.menu[item.submenu];
              if (mappedSubmenuId == null) {
                throw new Error(
                  `Cannot find submenu with id ${item.submenu.id}`
                );
              }
              item.submenu = mappedSubmenuId;
            }
            return item;
          });
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
            header: {
              menu: idMap.menu[data.header.menu],
            },
          });
          idMap.store[data.id] = created.id;
        }
      } else {
        strapi.log.info("Skip stores seed");
      }

      // Seed product lists
      const productListsCount = await strapi.services["product-list"].count();
      if (productListsCount === 0) {
        strapi.log.info("Create product lists..");
        for (let i = 0; i < productLists.length; i++) {
          const { image, parent, ...data } = productLists[i];
          const created = await strapi.services["product-list"].create({
            ...data,
            parent: parent ? idMap.productLists[parent] : null,
          });
          idMap.productLists[data.id] = created.id;
          if (image) {
            const entry = {
              id: created.id,
              model: "product-list",
              field: "image",
            };
            await uploadEntryImage(entry, image);
          }
        }
      } else {
        strapi.log.info("Skip product lists seed");
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

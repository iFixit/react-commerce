const path = require("path");

module.exports = ({ env }) => {
  if (env("NODE_ENV") === "production") {
    return {
      connection: {
        client: "mysql",
        connection: {
          host: env("DATABASE_HOST", "127.0.0.1"),
          port: env.int("DATABASE_PORT", 5432),
          database: env("DATABASE_NAME", "strapi"),
          user: env("DATABASE_USERNAME", "strapi"),
          password: env("DATABASE_PASSWORD", "strapi"),
          schema: env("DATABASE_SCHEMA", "public"), // Not required
        },
        debug: false,
      },
    };
  } else {
    return {
      connection: {
        client: "sqlite",
        connection: {
          filename: path.join(
            __dirname,
            "..",
            env("DATABASE_FILENAME", ".tmp/data.db")
          ),
        },
        useNullAsDefault: true,
      },
    };
  }
};

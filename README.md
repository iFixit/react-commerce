# [iFixit React Commerce](https://react-commerce.vercel.app)

New iFixit e-commerce site.

## Development

The project contains a `backend` folder with Strapi config and a `frontend` with Next.js.
You can run the backend both using SQLite and using Postgres with docker compose. For now the recommended approach for local dev is to just use SQLite.

> :warning: If you are running Strapi using docker compose, be sure to delete `backend/node_modules` first, as your OS might differ from the docker container OS, so you want the docker container to install dependencies by itself.

The `frontend` directory is structured as follows:

- `pages`: contains the Next.js app pages (think of these like routes/controllers)
- `models`: contains business logic (e.g. how to fetch product list from API, how to subscribe to newsletter, etc.)
- `components`: contains the React view components
- `helpers`: contains reusable custom app-related helper functions
- `lib`: contains custom libraries that can stand on their own (e.g. `lib/algolia`). Think of these as packages that potentially could be used in other projects.
- `assets`: contains assets imported from view components (e.g. svg illustrations)
- `public`: contains the static files
- `config`: contains app configurable settings (e.g. environment variables, constants, etc.)

### Install

This command will install both backend and frontend dependencies:

```sh
npm run install:all
```

### Dev server

This command will start Strapi dev server and Next.js dev server:

```sh
npm run dev
```

### Test

This command will start Cypress:

```sh
npm run cypress:open
```

### Using SVG

If you want to use an svg as a React component, add it to `frontend/assets/svg/files` and run

```sh
npm run transform-svg
```

The script will take svg files and transform them into React components that you can import like this:

```tsx
import { LifetimeWarrantyIcon } from "@assets/svg";
```

> :warning: SVGR uses the name of the file to name the component (it converts it to camel case), so name the svg accordingly.

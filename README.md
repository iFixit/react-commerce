# [iFixit React Commerce](https://react-commerce.vercel.app)

New iFixit e-commerce site.

## Development

### Prerequisites

-  npm v8
-  pnpm v7
-  node v16
-  yarn

Here's one way you can get all the right versions installed and setup:

1. Install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
2. `nvm use`
   -  run this command in the project root to install compatible versions of `node` and `npm`
3. `npm install -g pnpm@7`

### Setup

This command will install both backend and frontend dependencies:

Copy `.env.local.example` to `.env.local` and fill in the values.

```sh
pnpm install:all
```

#### Copy the environment files to local

1. Copy `backend/.env.example` to `backend/.env`
2. Copy `frontend/.env.local.example` to `frontend/.env.local`

#### Fill in the Algolia API Key

In `frontend/.env.local` fill in `ALGOLIA_API_KEY` by either:

-  Copying the `Search API Key` [from Algolia](https://www.algolia.com/account/api-keys/all?applicationId=XQEP3AD9ZT)

   -  :warning: You may need to ask for access to our Algolia

-  Or copy the dev key from Cominor:

   ```sh
   cat /etc/dozuki/algolia-keys.json | jq --raw-output .searchApiKey
   ```

> Note: `SENTRY_AUTH_TOKEN` is not needed in development

### Start dev server

This command will start Strapi dev server and Next.js dev server:

```sh
pnpm dev
```

After running the dev server, you can access the site at `http://localhost:3000/Parts` or `http://localhost:3000/Tools`

> :warning: `http://localhost:3000/` is not yet routed and will 404.

#### Local Strapi instance

After running the dev server, you can access the Strapi admin panel at `http://localhost:1337/admin`. To login use email `strapi@ifixit.com` and password `Password1`.

The local Strapi dev server will allow you to make changes to the schema of content types. When you're satisfied with the changes, you can push into a new branch to get a preview url from [govinor](https://govinor.com/).

### Project structure

The project contains a `backend` folder with Strapi config and a `frontend` with Next.js.
You can run the backend both using SQLite and using Postgres with docker compose. For now the recommended approach for local dev is to just use SQLite.

> :warning: If you are running Strapi using docker compose, be sure to delete `backend/node_modules` first, as your OS might differ from the docker container OS, so you want the docker container to install dependencies by itself.

The `frontend` directory is structured as follows:

-  `pages`: contains the Next.js routes (usually these just export code from a template)
-  `models`: contains business logic (e.g. how to fetch product list from API, how to subscribe to newsletter, etc.)
-  `templates`: you can think of these as view controllers. Templates are especially useful to handle multiple routes (e.g. product list template is used by several routes, like `/Parts`, `/Tools`, `/Parts/Mac` etc.).
-  `layouts`: contains the layouts that each page can use. Right now we only have a default layout, but in the future we might have pages that will require to use a different layout component.
-  `components`: contains the React view components
-  `helpers`: contains reusable custom app-related helper functions
-  `lib`: contains custom libraries that can stand on their own (e.g. `lib/algolia`). Think of these as packages that potentially could be used in other projects.
-  `assets`: contains assets imported from view components (e.g. svg illustrations)
-  `public`: contains the static files
-  `config`: contains app configurable settings (e.g. environment variables, constants, etc.)

### Application architecture

Here's an overview of the production setup (the focus is on Next.js, therefore details on the iFixit app have been left out):

![image](https://user-images.githubusercontent.com/4640135/203180384-96f4d3d6-b39e-4da6-915d-d9cfd44de5c6.png)

### Test

This command will start Cypress:

```sh
pnpm run cypress:open
```

### Using SVG

If you want to use an svg as a React component, add it to `frontend/assets/svg/files` and run

```sh
pnpm run transform-svg
```

The script will take svg files and transform them into React components that you can import like this:

```tsx
import { LifetimeWarrantyIcon } from '@assets/svg';
```

> :warning: SVGR uses the name of the file to name the component (it converts it to camel case), so name the svg accordingly.

### Miscellaenous

#### Update Storefront graphql schema

When you need to update the Shopify storefront GraphQL schema version, follow these steps:

1. Update `NEXT_PUBLIC_SHOPIFY_STOREFRONT_VERSION` in `frontend/.env.development` and `frontend/.env.production`
2. Run `pnpm codegen:download-shopify-storefront-schema`

#### Generate Shopify storefront delegate access token

The public Shopify storefront API is rate limited by user IP. To avoid hitting the rate limit when making requests from the server, we use Shopify storefront API with a [delegate access token](https://shopify.dev/apps/auth/oauth/delegate-access-tokens). To generate a token for a shop, use the automation bot:

```sh
pnpm bot shopify create delegate-token
```

> :information_source: You can use the **Admin API Password** of the app that you use to generate the Storefront access token.

### Troubleshooting

#### Backend folder dependencies errors

Since [OSX 12.3](https://developer.apple.com/documentation/macos-release-notes/macos-12_3-release-notes), python(2) is no longer available by default.
If no prebuilt image is available for some dependencies like sqlite3, it may be necessary to install python(2) to build the image locally.
Brew has discontinued the python@2 formula, so one way to install it is via `pyenv`:

```
brew install pyenv
pyenv install 2.7.18
pyenv global 2.7.18
echo 'PATH=$(pyenv root)/shims:$PATH' >> ~/.zshrc
```

#### Local Strapi missing iFixit Test Store

With the latest changes, we might run into a situation where the local strapi does not have the ifixit test store in it. In order to fix this add the folowing to `backend/.env`

```
STRAPI_ADMIN_ENABLE_ADDONS_DANGEROUS_ACTIONS=true
```

With the latest version of main, go to your local strapi at http://localhost:1337/admin/plugins/addons and hit `Reset Seed` with the domain set to `main.govinor.com`.

If this page does not appear, then delete `backend/.cache` and `backend/dist` and re-start the dev server.

#### I've updated the Shopify Storefront schema version but the graphql codegen script is not working

Whenever you update the Shopify Storefront schema version, you need to run `pnpm codegen:download-shopify-storefront-schema` to download the new schema.

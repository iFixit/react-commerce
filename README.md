# [iFixit React Commerce](https://react-commerce.vercel.app)

New iFixit e-commerce site. TEST

## Development

### Setup Script (Easiest Startup):

1. Clone the repo, if not already done:

```sh
git clone https://github.com/iFixit/react-commerce.git
```

2. Install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
3. `cd react-commerce`
4. Run the script with your algolia API key set and `nvm use`:

```sh
nvm use && algoliaApiKey=123xyz ./startReactCommerce.sh
```

> **Not your first time?** If you have previously setup the algolia api key (i.e. it is still saved in `frontend/.env.local`), you don't need to specify it again.

> **Note:** You _may_ use an alternative method of getting the correct node version instead of nvm.

#### How to get Algolia API Key (two methods)

-  Copy the `Search API Key` [from Algolia](https://www.algolia.com/account/api-keys/all?applicationId=XQEP3AD9ZT) (You may need to ask for access to our Algolia)

-  Copy the dev key from Cominor:
   ```sh
   cat /etc/dozuki/algolia-keys.json | jq --raw-output .searchApiKey
   ```

### Prerequisites

-  npm v8
-  pnpm v8
-  node v18
-  yarn

Here's one way you can get all the right versions installed and setup:

1. Install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
2. `nvm use`
   -  run this command in the project root to install compatible versions of `node` and `npm`
3. `npm install -g pnpm@8`
4. `npm install -g yarn`

### Setup

#### Setup Verdaccio Auth Token

We use [Verdaccio](https://verdaccio.org/) as our private npm registry. To install packages from Verdaccio, you will need to setup an authentication token.

**You can retrieve the token from Slack** and then save it to `.env.local` as `VERDACCIO_AUTH_TOKEN`.

Otherwise, you can follow the steps below to create a new token:

<details>
<summary>Verdaccio - Creating Personal Access Token </summary>

⚠️ **_You will need to be IP whitelisted to be able to access our Verdaccio registry._**

<br/>

**New Users** <br/>
If you've never created a Verdaccio account, you can follow these steps:

1. Copy `.env.local.example` to `.env.local`
   ```
   cp .env.local.example .env.local
   ```
2. Run
   ```
   pnpm adduser --registry=https://verdaccio.ubreakit.com
   ```
   -  _You will then be prompted to enter some information_
3. Enter a `username`
4. Enter a `password` - _make it rememberable and strong_
5. Enter an `email address`

**Login** <br/>
If you've already created a Verdaccio account, and need to grab the token again, you can follow these steps:

1. Run
   ```
   pnpm login --registry=https://verdaccio.ubreakit.com
   ```
2. Enter your `username`
3. Enter your `password`

<br/>

**Setting the Env Token** <br/>
Once you've signed up, or logged in, the Verdaccio auth token will be saved to your `~/.npmrc`. You can grab the token from there and save it to `.env.local` as `VERDACCIO_AUTH_TOKEN`.

<br/>

⚠️ **_If you don't want to use the Verdaccio registry outside of this repo, you can run the following:_**

-  ```
   pnpm logout --registry=https://verdaccio.ubreakit.com
   ```
   -  This will remove the Verdaccio auth token from your `~/.npmrc`, and so long as you've exported the token to `.env.local`, you will still be able to install packages from Verdaccio for this repo.

</details>

#### Setup strapi Env file

1. Copy `backend/.env.example` to `backend/.env`

#### Setup next.js environment file (with vercel account)

1. Setup pnpm so installed modules are in your PATH:

-  `pnpm setup && source ~/.bashrc` (if you haven't already done so)

2. Install vercel cli: `pnpm install -g vercel`
3. `vercel login`
4. `cd path/to/this/repo && vercel link --project=react-commerce`
5. Choose the `iFixit` scope when it asks which scope to use
6. `vercel env pull`
7. `ln -s ../.env frontend/.env.local`

#### Setup next.js environment file (without vercel account)

1. Copy `frontend/.env.local.example` to `frontend/.env.local`
2. Fill in the Algolia API Key
   -  In `frontend/.env.local` fill in `ALGOLIA_API_KEY` by either:
      -  Copying the `Search API Key` [from Algolia](https://www.algolia.com/account/api-keys/all?applicationId=XQEP3AD9ZT)
         -  :warning: You may need to ask for access to our Algolia
      -  Or copying the dev key from Cominor:
         ```sh
         cat /etc/dozuki/algolia-keys.json | jq --raw-output .searchApiKey
         ```
   -  Note: `SENTRY_AUTH_TOKEN` is not needed in development

#### Install Dependencies

This command will install both backend and frontend dependencies:

```sh
pnpm install:all
```

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

## Dev Notes

Next.js's dev server automatically listens to `localhost:3000` as well as your local IP address and the same port. This means that you can access the dev server from other devices on your network. This is useful for testing on mobile devices.

EX: `http://192.168.1.123:3000`

However, if you are using a firewall, you may need to allow incoming connections to port 3000.

### Firewall

#### Ubuntu

The running firewall is mostlikely `ufw`.

To allow incoming connections to port 3000, run:

```sh
sudo ufw allow 3000
```

To remove the rule, run:

```sh
sudo ufw delete allow 3000
```

## Project structure

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
-  `lib`: contains custom libraries that can stand on their own (e.g. `lib/strapi-sdk`). Think of these as packages that potentially could be used in other projects.
-  `assets`: contains assets imported from view components (e.g. svg illustrations)
-  `public`: contains the static files
-  `config`: contains app configurable settings (e.g. environment variables, constants, etc.)

### Application architecture

Here's an overview of the production setup (the focus is on Next.js, therefore details on the iFixit app have been left out):

![image](https://user-images.githubusercontent.com/4640135/203581627-82ab19ca-7de7-4343-ae05-2a4f6330f38a.png)

## Tests

We use [Jest](https://jestjs.io) and [Playwright](https://playwright.dev/) (with [MSW](https://mswjs.io/)) to run our tests.

At the moment, we only have tests for the `frontend`. These tests are located in the [`frontend/tests`](frontend/tests) directory.

### Running Jest Tests

> ⚠️ We don't need to have the dev server running before we run the Jest tests.

You can use the following command to run all the `Jest` tests:

```sh
pnpm test
```

Additionally, you can pass any `Jest` flag to the command by prepending `--` before the flags:

```sh
pnpm test -- --watch
pnpm test -- ProductListItem --updateSnapshot
```

⚠️ **Note:** You will not be able to interact with the Jest CLI prompt if the tests were ran from the `root` directory. To be able to interact with the Jest CLI prompt, you will need to run the tests from the `frontend` directory.

|                                               Root Dir Execution                                                |                                               Frontend Execution                                                |
| :-------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: |
| ![image](https://user-images.githubusercontent.com/22064420/225107750-2e161321-dc48-424a-880c-9d10ba1b12c3.png) | ![image](https://user-images.githubusercontent.com/22064420/225106631-9d459540-4659-4f40-9070-40f25a5ac979.png) |

**For more information on Jest flags, click on the link to read the docs: [Jest CLI](https://jestjs.io/docs/cli)**

<br/>

### Running Playwright Tests

> ⚠️ We need the dev server running to run the Playwright tests. You can run the dev server by running `pnpm dev` in the `root` directory.
>
> You can also just let Playwright start the dev server automatically when running the tests, but this will make running Playwright tests slower as it will need to start the dev server every time.

You can use the following command to run all `Playwright` tests:

-  **Run all tests for all devices _(a.k.a projects)_**
   ```sh
   pnpm playwright:run
   ```

<br/>

If you want to **debug** all the tests, or a single test, you can use the following command:

-  **Run all tests for Desktop Chrome**
   ```sh
   pnpm playwright:debug [test_name]
   ```
   -  This will make Playwright do the following:
      -  Launch the browser in **headed** mode
      -  Disables parallelization
      -  Sets the `timeout` to `0` (_no timeout_)
      -  Configures a `playwright` object in the browser to allow you to interact with Playwright's Locator API right from the browser's console
      -  Enables verbose logging of Playwright's API calls

Additionally, you can directly add any `Playwright` flag to the command:

```sh
pnpm playwright:run --project="Desktop Chrome" fix_kit
pnpm playwright:run --project="Mobile Chrome" --headed fix_kit
```

**For more information on Playwright flags, click on the link to read the docs: [Playwright CLI](https://playwright.dev/docs/test-cli#reference)**

⚠️ **For more Playwright specific information such as Mocking API Requests and
debugging tips, check out the [testing-doc](frontend/tests/playwright/testing-doc.md)**

## Using Feature Flags

To create feature flags the project uses an approach based on environment variables.

### Premises

-  We have two Vercel projects for `react-commerce`: One is essentially a staging project (`react-commerce`), and the other is for production (`react-commerce-prod`).
-  Each Vercel project has preview deployments for each branch in the repo.

### Steps to Add a Feature Flag

1. **Setup a flag key**: In the `frontend/config/flags.ts` file, add a new flag key to the flags dictionary. For example:

   ```ts
   export const flags = {
      // ...
      STORE_HOME_PAGE_ENABLED:
         process.env.NEXT_PUBLIC_FLAG__STORE_HOME_PAGE_ENABLED === 'true',
   };
   ```

1. **Local Development**: Set the flag to `true` in your `frontend/.env.development` file. This lets you access the feature during local development. For example:

   ```
   NEXT_PUBLIC_FLAG__STORE_HOME_PAGE_ENABLED=true
   ```

   > Note: If you need to override the flag in your local development environment, you can set the flag to `false` in your `frontend/.env.local` file.

1. **Staging**: Go to Vercel [`react-commerce` project settings](https://vercel.com/ifixit/react-commerce/settings/environment-variables), and add the environment variable for the flag, setting it to `true`. You don't need to select any branch or environment — just leave all the checkboxes checked.
1. **Production**: Finally, when you're ready to roll out the feature, set the environment variable to `true` in the Vercel [`react-commerce-prod` project settings](https://vercel.com/ifixit/react-commerce-prod/settings/environment-variables).
   > Note: It's not necessary to set the flag to `false` while developing the feature. If the flag is not set, it will default to `false`.

### Use the Flag

To use the flag, you can just import the flags dictionary from `frontend/config/flags.ts` and use it in your code. For example:

```tsx
import { flags } from '@config/flags';

function Page() {
   // ...
   if (!flags.STORE_HOME_PAGE_ENABLED) return notFound();
   // ...
}
```

### Notes

-  This approach allows QA devs to see new features by using `react-commerce` previews, without needing to know about the feature flags.
-  The `react-commerce` preview can be use to QA the changes with feature flags enabled, and the `react-commerce-prod` preview can be used to QA the changes with feature flags disabled.

## Using SVG

If you want to use an svg as a React component, add it to `frontend/assets/svg/files` and run

```sh
pnpm run transform-svg
```

The script will take svg files and transform them into React components that you can import like this:

```tsx
import { LifetimeWarrantyIcon } from '@assets/svg';
```

> :warning: SVGR uses the name of the file to name the component (it converts it to camel case), so name the svg accordingly.

## Miscellaenous

### Update Storefront graphql schema

When you need to update the Shopify storefront GraphQL schema version, follow these steps:

1. Update `NEXT_PUBLIC_SHOPIFY_STOREFRONT_VERSION` in `frontend/.env.development` and `frontend/.env.production`
2. Run `pnpm codegen:download-shopify-storefront-schema`

### Generate Shopify storefront delegate access token

The public Shopify storefront API is rate limited by user IP. To avoid hitting the rate limit when making requests from the server, we use Shopify storefront API with a [delegate access token](https://shopify.dev/apps/auth/oauth/delegate-access-tokens). To generate a token for a shop, use the automation bot:

```sh
pnpm bot shopify create delegate-token
```

> :information_source: You can use the **Admin API Password** of the app that you use to generate the Storefront access token.

## Troubleshooting

### Backend folder dependencies errors

Since [OSX 12.3](https://developer.apple.com/documentation/macos-release-notes/macos-12_3-release-notes), python(2) is no longer available by default.
If no prebuilt image is available for some dependencies like sqlite3, it may be necessary to install python(2) to build the image locally.
Brew has discontinued the python@2 formula, so one way to install it is via `pyenv`:

```
brew install pyenv
pyenv install 2.7.18
pyenv global 2.7.18
echo 'PATH=$(pyenv root)/shims:$PATH' >> ~/.zshrc
```

### Local Strapi missing iFixit Test Store

With the latest changes, we might run into a situation where the local strapi does not have the ifixit test store in it. In order to fix this add the folowing to `backend/.env`

```
STRAPI_ADMIN_ENABLE_ADDONS_DANGEROUS_ACTIONS=true
```

With the latest version of main, go to your local strapi at http://localhost:1337/admin/plugins/addons and hit `Reset Seed` with the domain set to `main.govinor.com`.

If this page does not appear, then delete `backend/.cache` and `backend/dist` and re-start the dev server.

### I've updated the Shopify Storefront schema version but the graphql codegen script is not working

Whenever you update the Shopify Storefront schema version, you need to run `pnpm codegen:download-shopify-storefront-schema` to download the new schema.

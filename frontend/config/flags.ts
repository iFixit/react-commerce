export const flags = {
   STORE_HOME_PAGE_ENABLED:
      process.env.NEXT_PUBLIC_FLAG__STORE_HOME_PAGE_ENABLED === 'true',
   STORE_PAGES_APP_ROUTER_ENABLED:
      process.env.NEXT_PUBLIC_FLAG__STORE_PAGES_APP_ROUTER_ENABLED === 'true',
};

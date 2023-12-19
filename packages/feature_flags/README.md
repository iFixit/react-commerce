This is a very basic feature-flag system. It is designed to meet several constraints:

1. Extremely lightweight. We don't want any extra requests to determine if flags
   are enabled or disabled.
2. Persistent enabling/disabling of flags for users. Ideally, we'd support
   flipping flags by userid, but that currently would require an additional
   server request, which we're avoiding (see 1). So we support local-storage as
   a next-best option. Perhaps cookies will someday be a better approach.
3. Compatibility with PHP. We want to be able to easily integrate this into our
   PHP code. This requires two things:
   1. No dependencies on NextJS-specific features. This is why we choose to
      have all the feature-flag code be client-side in NextJS.
   2. A flag format which is visible to PHP: This drives the decision to store
      flags in JSON format.

## Usage

### Adding a feature flag

Add feature flags to `flags.json`. If you get the schema wrong, `index.ts` will
have type errors. The valid schema is kept in `flag_schema.ts`.

### Reading a feature flag

Use the `checkFlag` function from `index.ts`. It should have types such that it
will only accept keys for flags which actually exist.

## Design Rationale

I chose not to use cookies due to the additional complexity they add. Local
Storage is really easy to use, and for our initial version should do just what
we need.

I discovered that TypeScript is totally able to typecheck the flags JSON file.
We're taking advantage of that by assigning the imported JSON file to a constant
with the schema type; the assignment fails if the JSON doesn't match the
required schema.

## Future Work

-  Add a function to set a feature flag on the user's browser.
-  Add a page on the site which exposes all the user-configurable feature flags
   and allows the user to click the ones they want to set.
   -  Maybe use a GET param or something to set the flag in the user's browser, so
      there can be one-link flag setting options.
-  Add support for other parameters of interest when configuring flags.
-  Add a function for the PHP side which copies flags from Local Storage into
   PHP-compatible query parameters. This will make it possible to use the flags
   server-side.

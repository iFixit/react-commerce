This is a React wrapper for the feature flag system in @ifixit/feature_flags.
It's designed to ensure that the server and client rendering line up as much as
possible.

## Usage

Import `useFlag` from this package. Use it in a component like so:

```ts
const flag = useFlag('flagname');
```

Only valid flag names will typecheck; to add a flag, see the docs for @ifixit/feature_flags

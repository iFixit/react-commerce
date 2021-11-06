# [iFixit React Commerce](https://react-commerce.vercel.app)

A work in progress prototype for iFixit e-commerce functionalities.

## Development

The development setup is a standard setup for Next.js.

### Install

```sh
npm install
```

### Dev server

To start the dev server run:

```sh
npm run dev
```

### Using SVG

If you want to use an svg as a React component, add it to `assets/svg/files` and run

```sh
npm run transform-svg
```

The script will take svg files and transform them into React components that you can import like this:

```tsx
import { LifetimeWarrantyIcon } from '@assets/svg';
```

> :warning: SVGR uses the name of the file to name the component (it converts it to camel case), so name the svg accordingly.

## Farspeak demo

This demo shows how to use Farspeak ([farspeak/farspeak-js](https://github.com/farspeak/farspeak-js)) with Next.js server components.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Create an app in the [dashboard](https://dashboard.farspeak.ai).

Prepare env vars:

```js
const { FARSPEAK_APP, FARSPEAK_ENV, FARSPEAK_BACKEND_TOKEN } = process.env;
```

Or in shell:

```bash
export FARSPEAK_APP=
export FARSPEAK_ENV=
export FARSPEAK_BACKEND_TOKEN=
```

Install dependencies:

```bash
npm install
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

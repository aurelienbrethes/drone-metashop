This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Environment Variables

Locally, you can run since the project folder

```bash
$ cp .env.example .env
```

in your terminal and fill in values in the new `.env` file

or complete manually.

```bash
NEXT_PUBLIC_CURRENCY=<EUR | USD>
NEXT_PUBLIC_TAX_RATE=20
NEXT_PUBLIC_MAX_QUANTITY_PURCHASABLE=200
NEXT_PUBLIC_REQUEST_TIMEOUT=10000 # Default set to 10 seconds you can custom this value
CONTACT_EMAIL_ADDRESS=<Your contact email address>
BUSINESS_NAME=MetaShop
TAX_REGISTRATION_NUMBER=<Your tax registration number>
SECRET=<Random string used by jwt>
NEXT_PUBLIC_JWT_EXPIRATION_TIME=1800000 # Default set to 30mn you can custom this value
ADMIN_USERNAME=<To acces front app>
ADMIN_PASSWORD=<To access front app>
PAYMENT_WALLET_ADDRESS=<Your wallet address>
REQUEST_API_KEY=<Your request API key>
REQUEST_API_URL=https://api.request.network
NEXT_PUBLIC_REQUEST_INVOICING_URL=<Request invoicing app url>
PAYMENT_CURRENCY='jEUR-matic' # You can use 'FAU-rinkeby' in dev
WOOCOMMERCE_API_URL=<Your wordpress with woocommerce plugin installed url>
WOOCOMMERCE_CONSUMER_KEY=<Your woocommerce api customer key>
WOOCOMMERCE_CONSUMER_SECRET=<Your woocommerce api customer secret>
WOOCOMMERCE_VERSION=wc/v3
PARASWAP_API_URL= https://apiv5.paraswap.io
PARTNER_WALLET_ADDRESS=<The contract that will receive payment fees>
PARTNER_FEE_PERCENTAGE=200 # used to apply 2% fees to the payment
```

# Next config

To enable your Next app to load images from external domains, you have to set that in `next.config.js`
For maximum compatibility, external domains must be protected with ssl certificats (https)

```js
module.exports = {
    images: {
        domains: ['example.com', 'example2.com'],
    },
};
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

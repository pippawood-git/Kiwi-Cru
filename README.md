# Kiwi Cru Shopify Theme

## Theme Setup

1. Switch to nvm `20` version

```text
nvm use 20
```

2. Generate `package-lock.json`:

```text
npm i --package-lock-only
```

3. Ensure you have the Shopify CLI packages installed globally first:

```bash
npm install -g @shopify/cli @shopify/theme
```

4. Then install the theme packages

```bash
npm install
```

## Theme Development

1. Start the development server

```bash
npm run start
```

2. Lint the theme

```bash
npm run lint
```

3. Pull the theme from Shopify

```bash
npm run shopify:pull
```

4. Deploy to Shopify
   Prompts to select which theme to deploy to.

```bash
npm run deploy
```

5. Deploy to Shopify as a new theme

```bash
npm run deploy:new
```

6. Deploy to the LIVE Shopify theme

```bash
npm run deploy:live
```

7. Running Shopify CLI commands directly

```bash
npm run shopify -- {command} {args}
```
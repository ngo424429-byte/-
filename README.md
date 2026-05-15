# Hongtu Helmet ODM/OEM Website

Dongguan Hongtu Sporting Goods Co., Ltd. B2B website demo for sports helmet ODM/OEM manufacturing.

## Local Development

```bash
npm install
npm run dev
```

Default local URL:

```text
http://127.0.0.1:5173/
```

Product gallery:

```text
http://127.0.0.1:5173/gallery
```

## Build

```bash
npm run build
```

The production files are generated in:

```text
dist
```

## Vercel Deployment

Use these settings on Vercel:

```text
Framework Preset: Vite
Install Command: npm install
Build Command: npm run build
Output Directory: dist
```

Do not upload `node_modules` or `dist` to GitHub. Vercel will install dependencies and build the site automatically.

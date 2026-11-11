# Dollyspro Interior Design Studio

A frontend-only portfolio and enquiry demo built with React, Vite, Tailwind CSS, Framer Motion, GSAP ScrollTrigger and Lenis.

## Run locally

```bash
npm install
npm run dev
```

Vite prints the local development URL after startup.

## Production build

```bash
npm run build
npm run preview
```

The static production site is generated in `dist/`.

## Deploy

### Vercel

Import the repository into Vercel. Use `npm run build` as the build command and `dist` as the output directory.

### Netlify

Create a new site from the repository. Use `npm run build` as the build command and `dist` as the publish directory. For direct navigation to the demo routes, configure the host to serve `index.html` for unknown paths.

All project and journal content is sample data. The contact form demonstrates client-side validation and a success state; it does not transmit or store enquiries. Replace the sample WhatsApp destination and studio contact details before publishing for a real studio.

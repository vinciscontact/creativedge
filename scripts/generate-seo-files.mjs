// Generates robots.txt, sitemap.xml and llms.txt into dist/ from the real
// site URL, so no placeholder domain can ever ship again. Runs as part of
// `npm run build` (after vite build, before/independent of prerender).
//
// The site URL comes from VITE_SITE_URL — the same env var src/config/site.js
// uses for canonicals and schema @ids, keeping every SEO surface consistent.
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';

const DIST = new URL('../dist', import.meta.url).pathname
  .replace(/^\/([A-Za-z]:)/, '$1'); // strip leading slash on Windows drive paths

const FALLBACK = 'https://vinciscontact.github.io/creativedge';
const SITE = (process.env.VITE_SITE_URL || FALLBACK).replace(/\/$/, '');

if (!process.env.VITE_SITE_URL) {
  console.warn(
    '\n[generate-seo-files] WARNING: VITE_SITE_URL is not set.\n' +
      `Falling back to ${FALLBACK} — set VITE_SITE_URL in the deploy\n` +
      'environment (Vercel project settings / GitHub Actions env) so\n' +
      'canonicals, schema @ids, sitemap and robots all agree on one domain.\n'
  );
}

const ROUTES = ['/', '/about', '/services', '/portfolio', '/contact', '/privacy', '/terms'];
const TODAY = new Date().toISOString().slice(0, 10);

if (!existsSync(DIST)) mkdirSync(DIST, { recursive: true });

// ---------------------------------------------------------------- robots.txt
const AI_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Bingbot',
  'CCBot',
];
const robots = [
  'User-agent: *',
  'Allow: /',
  '',
  ...AI_BOTS.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', '']),
  `Sitemap: ${SITE}/sitemap.xml`,
  '',
].join('\n');
writeFileSync(`${DIST}/robots.txt`, robots);

// ---------------------------------------------------------------- sitemap.xml
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...ROUTES.flatMap((route) => [
    '  <url>',
    `    <loc>${SITE}${route === '/' ? '/' : route}</loc>`,
    `    <lastmod>${TODAY}</lastmod>`,
    '  </url>',
  ]),
  '</urlset>',
  '',
].join('\n');
writeFileSync(`${DIST}/sitemap.xml`, sitemap);

// ------------------------------------------------------------------ llms.txt
const llms = `# CreativzEdge

> CreativzEdge is a graphic design and branding studio with physical studios
> in Chennai and Mumbai, India, offering logo & brand identity, packaging,
> print, social media creative, and digital growth (SEO/GEO/AEO/SMO)
> services. 15+ years of design expertise, 1000+ projects delivered,
> clients across India, UK and USA — currently accepting new projects.

CreativzEdge is led by Venkata Krishnan (Creative Head), an Arena Multimedia
certified specialist, alongside a core team covering creative strategy,
visual design, digital marketing and finance/CRM. We design logos, brand
identity systems, packaging, social media creatives, print collateral,
event branding, and vehicle branding, and pair that with SEO/GEO/AEO/SMO
growth services to make brands discoverable in both traditional search and
AI answer engines.

## Services
- [Logo & Brand Identity](${SITE}/services): primary/secondary logos, brand colour palette, typography systems, brand guidelines PDF
- [Packaging Design](${SITE}/services): box/carton dielines, label & sticker design, pouch/sachet layouts, 3D mockups
- [Social Media Creatives](${SITE}/services): Instagram/Facebook posts, story & reel cover frames, LinkedIn/Twitter banners, monthly content packs
- [Brochures & Catalogues](${SITE}/services): bi-fold/tri-fold brochures, product catalogues, company profiles
- [Posters & Banners](${SITE}/services): event/promo posters, pull-up/roll-up banners, outdoor hoardings
- [Menu Cards & Restaurant Design](${SITE}/services): dine-in/takeaway menus, QR menus, table & tent cards
- [Business Cards & Stationery](${SITE}/services): premium business cards, letterheads, envelopes, notepads
- [Ads & Campaigns](${SITE}/services): Google & Meta display ads, billboard/OOH layouts, campaign visual systems
- [Digital Growth](${SITE}/services): SEO, GEO (Generative Engine Optimization), AEO (Answer Engine Optimization), social media optimization

## Company
- [About](${SITE}/about): studio story, team, vision & mission, core values, 15+ years / 1000+ projects / 100+ clients
- [Portfolio](${SITE}/portfolio): case studies including the Maiyson Therys full brand identity system, and work across logo design, brand identity, social media, packaging, vehicle branding and events
- [Contact](${SITE}/contact): Chennai and Mumbai studio locations, phone, email, WhatsApp inquiry

## Team
- Venkata Krishnan — Creative Head, Arena Multimedia certified
- Sivabalan — Creative Strategy Director
- Deepika — Finance / CRM
- Venkat — Strategic Advisor (cations.digital)

## Strategic Partners
- Tryphena Corera — Design partner; visual design & digital marketing
- Cations Digital Pvt. Ltd. — Digital marketing agency, Mumbai; SEO, PPC, SMO, web design & development; 1000+ clients supported
- VJM Technologies — Technology partner, website support
- TheVincis — Engineering partner, Microsoft & Infosys certified

## Locations
Chennai Studio: 25/4, Thiruvalluvar Street, Gandhi Nagar, Saligramam, Chennai, Tamil Nadu 600093, India
Phone: +91 72999 42627 | Email: creativzedge@gmail.com

Mumbai Studio: Kalpataru Estate, 3B-22, JVLR, Poonam Nagar, Andheri East, Mumbai, Maharashtra 400093, India
Phone: +91 95003 40369 | Email: designcreativzedge@gmail.com

## Notable Clients
- Drums Sivamani (Padma Shri, Percussion Legend)
- Dhara Logistics
- SIGAI
- DHARANI Cosmetic & Diabetic Centre
- 359 Event Planners
- Triya Construction

## Social & Verification
- Instagram: https://www.instagram.com/creativzedge_official/
- LinkedIn: https://www.linkedin.com/in/b-venkata-krishnan-87954a379
- Google Business Profile: https://www.google.com/search?kgmid=/g/11ylpc_5bh

## Policies
- [Privacy Policy](${SITE}/privacy)
- [Terms & Conditions](${SITE}/terms)
`;
writeFileSync(`${DIST}/llms.txt`, llms);

console.log(`[generate-seo-files] robots.txt, sitemap.xml, llms.txt written for ${SITE}`);

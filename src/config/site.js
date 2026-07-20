// Single source of truth for site-wide SEO facts.
// Set VITE_SITE_URL in the deploy environment (e.g. https://creativzedge.com)
// — every canonical, OG url and schema @id derives from it, so launch is a
// one-line env change, not a find/replace.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://PLACEHOLDER_DOMAIN').replace(/\/$/, '');

export const BRAND = 'CreativzEdge';

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/hero%20background.webp`;

export const LOCATIONS = {
  chennai: {
    name: `${BRAND} — Chennai Studio`,
    streetAddress: '25/4, Thiruvalluvar Street, Gandhi Nagar, Saligramam',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    postalCode: '600093',
    telephone: '+91-72999-42627',
    email: 'creativzedge@gmail.com',
  },
  mumbai: {
    name: `${BRAND} — Mumbai Studio`,
    streetAddress: 'Kalpataru Estate, 3B-22, JVLR, Poonam Nagar, Andheri East',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '400093',
    telephone: '+91-95003-40369',
    email: 'designcreativzedge@gmail.com',
  },
};

// Studio WhatsApp number (international format, no '+' or spaces for wa.me).
export const WHATSAPP_NUMBER = '917299942627';

export const SAME_AS = [
  'https://www.instagram.com/creativzedge_official/',
  'https://www.linkedin.com/in/b-venkata-krishnan-87954a379',
  'https://www.google.com/search?kgmid=/g/11ylpc_5bh',
];

// Team members as independent, @id-referenceable Person entities (About page).
// The founder node is also referenced from ORGANIZATION_SCHEMA so both
// describe the same entity instead of two disconnected ones.
const TEAM_PHOTO = (file) => `${SITE_URL}/images/portfolio%20projects/Our%20team/${file}`;
export const TEAM_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person-venkata-krishnan`,
      name: 'Venkata Krishnan',
      alternateName: 'Venkat',
      jobTitle: 'Founder / Creative Head',
      worksFor: { '@id': `${SITE_URL}/#organization` },
      sameAs: ['https://www.linkedin.com/in/b-venkata-krishnan-87954a379'],
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person-sivabalan`,
      name: 'Sivabalan',
      jobTitle: 'Creative Strategy Director',
      image: TEAM_PHOTO('sivabalan.webp'),
      worksFor: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person-tryphena-corera`,
      name: 'Tryphena Corera',
      jobTitle: 'Lead - Visual Designer & Digital Marketing Specialist',
      image: TEAM_PHOTO('Tryphena%20Corera.webp'),
      worksFor: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person-deepika`,
      name: 'Deepika',
      jobTitle: 'Finance / CRM',
      image: TEAM_PHOTO('Deepika.webp'),
      worksFor: { '@id': `${SITE_URL}/#organization` },
    },
  ],
};

// Site-wide entity graph: the brand, both physical studios, and the website.
// Rendered once from App.jsx so it ships on every route (and gets baked into
// the prerendered HTML for crawlers that don't execute JavaScript).
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#organization`,
      name: BRAND,
      alternateName: 'Creativzedge Studio',
      url: `${SITE_URL}/`,
      image: DEFAULT_OG_IMAGE,
      description:
        'CreativzEdge is a graphic design studio offering logo and brand identity, packaging design, social media creatives, brochures, posters, menu cards, business cards, advertising campaigns, and SEO/GEO/AEO/SMO services from studios in Chennai and Mumbai.',
      email: LOCATIONS.chennai.email,
      telephone: LOCATIONS.chennai.telephone,
      sameAs: SAME_AS,
      founder: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person-venkata-krishnan`,
        name: 'Venkata Krishnan',
        alternateName: 'Venkat',
        jobTitle: 'Founder / Creative Head',
      },
      makesOffer: [
        'Logo & Brand Identity',
        'Packaging Design',
        'Social Media Creatives',
        'Brochures & Catalogues',
        'Posters & Banners',
        'Menu Card Design',
        'Business Cards & Stationery',
        'Ads & Campaigns',
        'SEO / GEO / AEO / SMO',
      ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
      department: [{ '@id': `${SITE_URL}/#location-chennai` }, { '@id': `${SITE_URL}/#location-mumbai` }],
    },
    ...Object.entries(LOCATIONS).map(([key, loc]) => ({
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#location-${key}`,
      name: loc.name,
      parentOrganization: { '@id': `${SITE_URL}/#organization` },
      image: DEFAULT_OG_IMAGE,
      telephone: loc.telephone,
      email: loc.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: loc.streetAddress,
        addressLocality: loc.addressLocality,
        addressRegion: loc.addressRegion,
        postalCode: loc.postalCode,
        addressCountry: 'IN',
      },
      url: `${SITE_URL}/contact`,
    })),
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: `${BRAND} Studio`,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-IN',
    },
  ],
};

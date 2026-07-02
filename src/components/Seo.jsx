import { Helmet } from 'react-helmet-async';
import { SITE_URL, BRAND, DEFAULT_OG_IMAGE } from '../config/site';

/**
 * Per-route head tags: unique title, description, canonical, Open Graph /
 * Twitter cards, and a BreadcrumbList. Every indexable page renders one.
 *
 * Props:
 *  - title:        full <title> text
 *  - description:  150-160 char meta description
 *  - path:         route path starting with "/" (canonical + og:url)
 *  - breadcrumb:   label for this page in the breadcrumb trail (omit on home)
 *  - image:        absolute OG image URL (defaults to the hero)
 *  - noindex:      true for pages that must stay out of the index (404)
 *  - schema:       extra page-specific JSON-LD object(s) to embed
 */
const Seo = ({ title, description, path = '/', breadcrumb, image = DEFAULT_OG_IMAGE, noindex = false, schema }) => {
  const url = `${SITE_URL}${path === '/' ? '/' : path}`;

  const breadcrumbSchema = breadcrumb
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: breadcrumb, item: url },
        ],
      }
    : null;

  const extraSchemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:site_name" content={`${BRAND} Studio`} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />

      {breadcrumbSchema && <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>}
      {extraSchemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;

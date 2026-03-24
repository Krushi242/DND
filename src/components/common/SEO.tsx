import { useEffect } from 'react';

type SEOProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string;
};

const SITE_NAME = 'DRD Plantech LLP';
const DEFAULT_IMAGE = '/site-logo.jpg';

const setMetaTag = (
  selector: string,
  attributes: Record<string, string>,
  content: string
) => {
  let tag = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!tag) {
    tag = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => {
      tag?.setAttribute(key, value);
    });
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
};

const setLinkTag = (
  selector: string,
  attributes: Record<string, string>,
  href: string
) => {
  let tag = document.head.querySelector(selector) as HTMLLinkElement | null;

  if (!tag) {
    tag = document.createElement('link');
    Object.entries(attributes).forEach(([key, value]) => {
      tag?.setAttribute(key, value);
    });
    document.head.appendChild(tag);
  }

  tag.setAttribute('href', href);
};

const SEO = ({ title, description, path, image, keywords }: SEOProps) => {
  useEffect(() => {
    const origin = window.location.origin;
    const canonicalUrl = new URL(path, origin).toString();
    const imageUrl = new URL(image || DEFAULT_IMAGE, origin).toString();
    const fullTitle = `${title} | ${SITE_NAME}`;

    document.title = fullTitle;

    setMetaTag('meta[name="description"]', { name: 'description' }, description);
    setMetaTag(
      'meta[name="keywords"]',
      { name: 'keywords' },
      keywords ||
        'DRD Plantech LLP, hybrid seeds, vegetable seeds, field crop seeds, agriculture, India'
    );
    setMetaTag('meta[name="robots"]', { name: 'robots' }, 'index, follow');
    setMetaTag('meta[name="author"]', { name: 'author' }, SITE_NAME);
    setMetaTag('meta[property="og:type"]', { property: 'og:type' }, 'website');
    setMetaTag('meta[property="og:site_name"]', { property: 'og:site_name' }, SITE_NAME);
    setMetaTag('meta[property="og:title"]', { property: 'og:title' }, fullTitle);
    setMetaTag('meta[property="og:description"]', { property: 'og:description' }, description);
    setMetaTag('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl);
    setMetaTag('meta[property="og:image"]', { property: 'og:image' }, imageUrl);
    setMetaTag('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', { name: 'twitter:title' }, fullTitle);
    setMetaTag(
      'meta[name="twitter:description"]',
      { name: 'twitter:description' },
      description
    );
    setMetaTag('meta[name="twitter:image"]', { name: 'twitter:image' }, imageUrl);
    setLinkTag('link[rel="canonical"]', { rel: 'canonical' }, canonicalUrl);

    let schemaScript = document.getElementById('seo-structured-data');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'seo-structured-data';
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }

    schemaScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: SITE_NAME,
          url: origin,
          logo: imageUrl,
        },
        {
          '@type': 'WebPage',
          name: fullTitle,
          url: canonicalUrl,
          description,
        },
      ],
    });
  }, [description, image, keywords, path, title]);

  return null;
};

export default SEO;

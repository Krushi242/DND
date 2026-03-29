import { useEffect } from 'react';

type SEOProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string;
  preloadImage?: string;
};

const SITE_NAME = 'DRD Plantech LLP';
const DEFAULT_IMAGE = '/site-logo.jpg';

const resolveUrl = (value: string, origin: string) => {
  try {
    return new URL(value, origin).toString();
  } catch {
    return null;
  }
};

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
    tag.setAttribute('href', href);
    Object.entries(attributes).forEach(([key, value]) => {
      tag?.setAttribute(key, value);
    });
    document.head.appendChild(tag);
    return;
  }

  tag.setAttribute('href', href);
};

const SEO = ({ title, description, path, image, keywords, preloadImage }: SEOProps) => {
  useEffect(() => {
    const origin = window.location.origin;
    const canonicalUrl = new URL(path, origin).toString();
    const imageUrl = new URL(image || DEFAULT_IMAGE, origin).toString();
    const preloadUrl =
      typeof preloadImage === 'string' && preloadImage.trim()
        ? resolveUrl(preloadImage, origin)
        : null;
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

    const preloadSelector = 'link[data-seo-preload="true"]';

    if (preloadUrl) {
      setLinkTag(
        preloadSelector,
        { rel: 'preload', as: 'image', 'data-seo-preload': 'true' },
        preloadUrl
      );
    } else {
      document.head.querySelector(preloadSelector)?.remove();
    }

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

    return () => {
      document.head.querySelector(preloadSelector)?.remove();
    };
  }, [description, image, keywords, path, preloadImage, title]);

  return null;
};

export default SEO;

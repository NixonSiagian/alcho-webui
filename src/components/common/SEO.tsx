/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Keeps document title and social meta (Open Graph / Twitter) in sync during
 * client-side navigation. Crawlers read the static tags in index.html; this
 * keeps the in-app experience and deep links consistent with the brand.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  /** Absolute or root-relative path to a social preview image. */
  image?: string;
}

const SITE_NAME = 'Alcho';
const SITE_URL = 'https://www.alcho.my.id';
const DEFAULT_TITLE = 'Alcho | Industrial Flavor Solutions';
const DEFAULT_DESCRIPTION =
  'Premium Indonesian seasoning solutions for food manufacturers, horeca businesses, and OEM partners.';
const DEFAULT_IMAGE = `${SITE_URL}/og-alcho.jpg`;

/** Create or update a <meta> tag identified by name or property. */
function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function SEO({ title, description, keywords, image }: SEOProps) {
  const location = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
    const desc = description || DEFAULT_DESCRIPTION;
    const url = `${SITE_URL}${location.pathname}`;
    const img = image
      ? image.startsWith('http')
        ? image
        : `${SITE_URL}${image}`
      : DEFAULT_IMAGE;

    document.title = fullTitle;

    upsertMeta('name', 'description', desc);
    if (keywords) upsertMeta('name', 'keywords', keywords);

    // Open Graph
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', img);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:type', 'website');

    // Twitter
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', desc);
    upsertMeta('name', 'twitter:image', img);
  }, [title, description, keywords, image, location.pathname]);

  return null;
}

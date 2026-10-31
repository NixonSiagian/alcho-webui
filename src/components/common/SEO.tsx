/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Keeps page metadata and canonical URLs in sync during client-side navigation.
 * Static metadata in index.html remains the source crawlers receive on first load.
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
const DEFAULT_TITLE = 'Alcho | Indonesian Seasoning & Food Ingredients Manufacturer';
const DEFAULT_DESCRIPTION =
  'Alcho is the seasoning and food ingredients brand of PT. NEW ALFA OMEGA UTAMA, an Indonesian manufacturer serving HORECA, OEM food manufacturers, and distributors.';
const DEFAULT_IMAGE = `${SITE_URL}/og-alcho.jpg`;

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export default function SEO({ title, description, keywords, image }: SEOProps) {
  const location = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
    const desc = description || DEFAULT_DESCRIPTION;
    const normalizedPath = location.pathname === '/'
      ? '/'
      : location.pathname.replace(/\/+$/, '');
    const url = `${SITE_URL}${normalizedPath}`;
    const img = image
      ? image.startsWith('http')
        ? image
        : `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`
      : DEFAULT_IMAGE;

    document.title = fullTitle;
    upsertCanonical(url);
    upsertMeta('name', 'description', desc);
    if (keywords) upsertMeta('name', 'keywords', keywords);

    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', img);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:locale', 'en_US');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', desc);
    upsertMeta('name', 'twitter:image', img);
  }, [title, description, keywords, image, location.pathname]);

  return null;
}

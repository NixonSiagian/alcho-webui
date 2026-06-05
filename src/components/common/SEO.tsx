/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const DEFAULT_TITLE = 'Alcho Foods | PT. NEW ALFA OMEGA UTAMA';
const DEFAULT_DESCRIPTION = 'Industrial-scale seasoning systems and premium flavor solutions for Horeca, OEM, and Food Manufacturers in Indonesia. Since 2008.';

export default function SEO({ title, description, keywords }: SEOProps) {
  const location = useLocation();

  useEffect(() => {
    // Set Title
    document.title = title ? `${title} | Alcho Foods` : DEFAULT_TITLE;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description || DEFAULT_DESCRIPTION);

    // Update Meta Keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }
  }, [title, description, keywords, location.pathname]);

  return null;
}

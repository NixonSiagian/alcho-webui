/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Resource Center data layer.
 *
 * The document library is driven entirely by `/public/resources/manifest.json`,
 * which is fetched at runtime. Adding, updating or removing a downloadable
 * document only requires dropping the file into `/public/resources/` and editing
 * the manifest — no code changes or rebuild of the components is needed.
 */

import { useEffect, useState } from 'react';
import { trackEvent } from './analytics';

export interface ResourceDocument {
  id: string;
  title: string;
  description: string;
  /** Public path served from /public, e.g. "/resources/file.pdf" */
  file: string;
  /** Display badge, e.g. "PDF" | "CSV" | "XLSX" */
  fileType: string;
  /** Human-readable size, e.g. "1.2 MB" */
  fileSize: string;
  /** ISO date string */
  updated: string;
  featured?: boolean;
  /** Marks the canonical price list used by product cards. */
  priceList?: boolean;
}

export interface ResourceCategory {
  id: string;
  title: string;
  description: string;
  /** Lucide icon name resolved by the UI. */
  icon: string;
  documents: ResourceDocument[];
}

export interface ResourceManifest {
  version: string;
  updated: string;
  categories: ResourceCategory[];
}

const MANIFEST_URL = '/resources/manifest.json';

let cache: ResourceManifest | null = null;
let inflight: Promise<ResourceManifest> | null = null;

/** Fetches the manifest once and caches it for the session. */
export function loadResourceManifest(): Promise<ResourceManifest> {
  if (cache) return Promise.resolve(cache);
  if (!inflight) {
    inflight = fetch(MANIFEST_URL, { headers: { Accept: 'application/json' } })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load resource manifest (${res.status})`);
        return res.json() as Promise<ResourceManifest>;
      })
      .then((data) => {
        cache = data;
        return data;
      })
      .catch((err) => {
        inflight = null; // allow retry on next mount
        throw err;
      });
  }
  return inflight;
}

interface ManifestState {
  manifest: ResourceManifest | null;
  loading: boolean;
  error: Error | null;
}

/** React hook that loads and caches the resource manifest. */
export function useResourceManifest(): ManifestState {
  const [state, setState] = useState<ManifestState>({
    manifest: cache,
    loading: !cache,
    error: null,
  });

  useEffect(() => {
    if (cache) {
      setState({ manifest: cache, loading: false, error: null });
      return;
    }
    let active = true;
    setState({ manifest: null, loading: true, error: null });
    loadResourceManifest()
      .then((manifest) => active && setState({ manifest, loading: false, error: null }))
      .catch((error) => active && setState({ manifest: null, loading: false, error }));
    return () => {
      active = false;
    };
  }, []);

  return state;
}

/** Returns the canonical price list document, if defined in the manifest. */
export function getPriceListDocument(manifest: ResourceManifest | null): ResourceDocument | null {
  if (!manifest) return null;
  for (const category of manifest.categories) {
    const flagged = category.documents.find((doc) => doc.priceList);
    if (flagged) return flagged;
  }
  const priceCategory = manifest.categories.find((c) => c.id === 'price-list');
  return priceCategory?.documents[0] ?? null;
}

/** Looks up a single document anywhere in the manifest by its id. */
export function getDocumentById(manifest: ResourceManifest | null, id: string): ResourceDocument | null {
  if (!manifest) return null;
  for (const category of manifest.categories) {
    const doc = category.documents.find((d) => d.id === id);
    if (doc) return doc;
  }
  return null;
}

/**
 * Triggers a browser download for a document and emits a download analytics
 * event. `context` identifies where the download was initiated from
 * (e.g. "resource_center", "product_card").
 */
export function downloadResource(doc: ResourceDocument, context = 'resource_center'): void {
  trackEvent('resource_download', {
    document_id: doc.id,
    document_title: doc.title,
    file_type: doc.fileType,
    context,
  });

  const link = document.createElement('a');
  link.href = doc.file;
  link.download = doc.file.split('/').pop() || doc.title;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

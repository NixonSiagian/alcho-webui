/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Lightweight analytics dispatcher.
 *
 * Events are forwarded to whichever analytics backends are present on the page
 * (Google Tag Manager `dataLayer` and/or GA4 `gtag`), and are always emitted as
 * a DOM `CustomEvent` so any custom listener can subscribe. In development the
 * event is also logged to the console for verification.
 *
 * No backend is required for this to be safe — calls are no-ops if the provider
 * is absent. Wiring up GTM or GA4 later requires no changes here.
 */

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: string, params: AnalyticsParams = {}): void {
  const payload = { event, ...params, timestamp: new Date().toISOString() };

  if (typeof window === 'undefined') return;

  try {
    // Google Tag Manager
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);

    // GA4 / gtag.js
    window.gtag?.('event', event, params);

    // Generic listener hook (e.g. custom dashboards)
    window.dispatchEvent(new CustomEvent('alcho:analytics', { detail: payload }));

    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug('[analytics]', event, params);
    }
  } catch {
    /* analytics must never break the UI */
  }
}

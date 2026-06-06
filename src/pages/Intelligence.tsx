/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import SEO from '../components/common/SEO';
import MarketIntelligence from '../components/sections/market-intelligence/MarketIntelligence';

export default function Intelligence() {
  return (
    <div className="w-full pt-24">
      <SEO
        title="AI Market Intelligence"
        description="Alcho's AI-powered food & beverage intelligence center: daily trend detection, viral product tracking, and market opportunity analysis for HORECA, OEM, and food brands."
        keywords="food trends, flavor trends, market intelligence, AI food analysis, HORECA, OEM, Indonesia"
      />
      <MarketIntelligence />
    </div>
  );
}

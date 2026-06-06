#!/bin/bash
# Generate the Open Graph image (1200x630) from the official Alcho logo.
# Single logo source: docs/alcho-logo.png. No cropping or stretching — the
# logo is contained at its natural 1.5:1 aspect ratio over a premium cream bg.
set -e
cd "$(dirname "$0")/../.."

# Downscale the master logo for embedding (keeps file/base64 size reasonable).
sips --resampleHeightWidthMax 760 docs/alcho-logo.png --out /tmp/og_logo.png >/dev/null 2>&1
B64=$(base64 -i /tmp/og_logo.png | tr -d '\n')

# Logo drawn at 1.5:1 — width 480, height 320, centered horizontally.
cat > /tmp/og-alcho.svg <<EOF
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FCFAF4"/>
      <stop offset="1" stop-color="#F1ECE0"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.18" r="0.6">
      <stop offset="0" stop-color="#C99A2E" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#C99A2E" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="36" y="36" width="1128" height="558" rx="28" fill="none" stroke="#C99A2E" stroke-opacity="0.45" stroke-width="2"/>
  <text x="600" y="118" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="bold" letter-spacing="10" fill="#A65A2A">INDUSTRIAL FLAVOR SOLUTIONS</text>
  <image x="360" y="150" width="480" height="320" preserveAspectRatio="xMidYMid meet" xlink:href="data:image/png;base64,${B64}"/>
  <text x="600" y="510" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="38" fill="#581212">&#8220;Every Great Dish Starts With Great Seasoning&#8221;</text>
  <text x="600" y="566" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="20" letter-spacing="6" fill="#C99A2E">WWW.ALCHO.MY.ID</text>
</svg>
EOF

sips -s format jpeg -s formatOptions 90 /tmp/og-alcho.svg --out public/og-alcho.jpg >/dev/null 2>&1
echo "og-alcho.jpg: $(sips -g pixelWidth -g pixelHeight public/og-alcho.jpg 2>/dev/null | tail -2 | tr '\n' ' ') bytes=$(stat -f%z public/og-alcho.jpg)"

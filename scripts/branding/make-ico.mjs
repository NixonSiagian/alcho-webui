// Build a favicon.ico containing 16x16 and 32x32 PNG images.
// PNG-embedded ICO is supported by all modern browsers.
import { readFileSync, writeFileSync } from 'node:fs';

const sizes = [
  { size: 16, file: 'public/favicon-16x16.png' },
  { size: 32, file: 'public/favicon-32x32.png' },
];

const images = sizes.map(({ size, file }) => ({ size, data: readFileSync(new URL('../../' + file, import.meta.url)) }));

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(images.length, 4); // image count

const entries = [];
let offset = 6 + images.length * 16;
for (const img of images) {
  const e = Buffer.alloc(16);
  e.writeUInt8(img.size >= 256 ? 0 : img.size, 0); // width
  e.writeUInt8(img.size >= 256 ? 0 : img.size, 1); // height
  e.writeUInt8(0, 2); // palette
  e.writeUInt8(0, 3); // reserved
  e.writeUInt16LE(1, 4); // color planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(img.data.length, 8); // size of image data
  e.writeUInt32LE(offset, 12); // offset
  offset += img.data.length;
  entries.push(e);
}

const ico = Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
writeFileSync(new URL('../../public/favicon.ico', import.meta.url), ico);
console.log(`favicon.ico written: ${ico.length} bytes (${images.map((i) => i.size + 'px').join(', ')})`);

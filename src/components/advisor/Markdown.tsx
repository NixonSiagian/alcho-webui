/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Minimal, dependency-free markdown renderer for advisor responses.
 * Supports the subset the advisor produces: headings, ordered/unordered lists,
 * bold, inline code, links and paragraphs. Links are restricted to safe schemes
 * and external links open in a new tab; internal routes use the SPA router.
 */

import React from 'react';
import { Link } from 'react-router-dom';

const SAFE_URL = /^(https?:\/\/|mailto:|tel:|\/)/i;
const INLINE = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)\s]+)\))|(`([^`]+)`)/g;

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  INLINE.lastIndex = 0;

  while ((match = INLINE.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const key = `${keyPrefix}-${i++}`;

    if (match[1]) {
      nodes.push(<strong key={key} className="font-bold text-brand-text">{match[2]}</strong>);
    } else if (match[3]) {
      const label = match[4];
      const url = match[5];
      if (!SAFE_URL.test(url)) {
        nodes.push(label);
      } else if (url.startsWith('/')) {
        nodes.push(
          <Link key={key} to={url} className="text-brand-secondary font-medium underline underline-offset-2 hover:text-brand-primary">
            {label}
          </Link>,
        );
      } else {
        nodes.push(
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-secondary font-medium underline underline-offset-2 hover:text-brand-primary"
          >
            {label}
          </a>,
        );
      }
    } else if (match[6]) {
      nodes.push(
        <code key={key} className="px-1.5 py-0.5 rounded bg-brand-fill border border-brand-border font-mono text-[0.85em]">
          {match[7]}
        </code>,
      );
    }
    last = INLINE.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function Markdown({ text }: { text: string }) {
  const lines = text.replace(/\r/g, '').split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    // Headings (#, ##, ###)
    const heading = /^(#{1,3})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const cls =
        level === 1
          ? 'text-base font-bold text-brand-text mt-1 mb-1'
          : level === 2
            ? 'text-sm font-bold text-brand-text mt-1 mb-1'
            : 'text-sm font-semibold text-brand-text mt-1';
      blocks.push(
        <p key={key++} className={cls}>
          {renderInline(heading[2], `h${key}`)}
        </p>,
      );
      i++;
      continue;
    }

    // Unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ''));
        i++;
      }
      blocks.push(
        <ul key={key++} className="list-disc pl-5 space-y-1 my-1.5">
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it, `ul${key}-${idx}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ''));
        i++;
      }
      blocks.push(
        <ol key={key++} className="list-decimal pl-5 space-y-1 my-1.5">
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it, `ol${key}-${idx}`)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    // Paragraph (gather consecutive plain lines)
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,3})\s+/.test(lines[i]) &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i])
    ) {
      para.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={key++} className="leading-relaxed my-1.5 first:mt-0">
        {para.map((p, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <br />}
            {renderInline(p, `p${key}-${idx}`)}
          </React.Fragment>
        ))}
      </p>,
    );
  }

  return <div className="text-sm text-brand-text [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">{blocks}</div>;
}

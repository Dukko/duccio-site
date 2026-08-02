#!/usr/bin/env node
// Regenerates /feed.xml from writing/index.html and the <meta name="date">
// tag on each linked post. Run this after adding or editing a writing entry:
//   node scripts/build-feed.js
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE_URL = 'https://ducciomondanelli.com';

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function collapseWhitespace(str) {
  return str.replace(/\s+/g, ' ').trim();
}

function readMeta(html, name) {
  const match = html.match(new RegExp(`<meta name="${name}" content="([^"]*)">`));
  return match ? match[1] : null;
}

function main() {
  const indexPath = path.join(ROOT, 'writing', 'index.html');
  const indexHtml = fs.readFileSync(indexPath, 'utf8');

  const channelDescription = readMeta(indexHtml, 'description') || '';

  const liBlocks = [...indexHtml.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(m => m[1]);

  const items = liBlocks.map(block => {
    const hrefMatch = block.match(/<h3><a href="([^"]+)">([^<]+)<\/a><\/h3>/);
    const descMatch = block.match(/<p>\s*([\s\S]*?)\s*<\/p>/);
    if (!hrefMatch) return null;

    const href = hrefMatch[1];
    const title = hrefMatch[2];
    const description = descMatch ? collapseWhitespace(descMatch[1]) : '';

    const postPath = path.join(ROOT, href.replace(/^\//, ''));
    const postHtml = fs.readFileSync(postPath, 'utf8');
    const date = readMeta(postHtml, 'date');
    if (!date) {
      throw new Error(`${href} is missing <meta name="date" content="YYYY-MM-DD">`);
    }

    return {
      title,
      link: `${SITE_URL}${href}`,
      description,
      pubDate: new Date(`${date}T12:00:00Z`).toUTCString(),
    };
  }).filter(Boolean);

  // Stable sort: newest first, ties keep writing/index.html's existing order.
  items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  const itemsXml = items.map(item => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid>${escapeXml(item.link)}</guid>
      <pubDate>${item.pubDate}</pubDate>
      <description>${escapeXml(item.description)}</description>
    </item>`).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Duccio Mondanelli &#8212; Writing</title>
    <link>${SITE_URL}/writing/</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>${escapeXml(channelDescription)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${itemsXml}
  </channel>
</rss>
`;

  fs.writeFileSync(path.join(ROOT, 'feed.xml'), rss);
  console.log(`Wrote feed.xml with ${items.length} items.`);
}

main();

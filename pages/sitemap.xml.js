import { SITE } from "../src/content/site";
import { PUBLIC_ROUTES } from "../src/lib/routes";

function buildSitemap() {
  const urls = PUBLIC_ROUTES.map(
    ({ path, priority }) =>
      `  <url>\n    <loc>${SITE.url}${path}</loc>\n    <priority>${priority}</priority>\n  </url>`
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
  res.write(buildSitemap());
  res.end();
  return { props: {} };
}

export default function Sitemap() {
  return null;
}

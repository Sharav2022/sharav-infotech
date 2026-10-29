import { SITE } from "../src/content/site";

export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
  res.write(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
  res.end();
  return { props: {} };
}

export default function Robots() {
  return null;
}

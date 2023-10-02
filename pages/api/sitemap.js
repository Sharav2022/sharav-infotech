import { Services } from "../../src/globals/mock";

const sitemaps = [
  {
    id: 1,
    context: "support",
  },
  {
    id: 2,
    context: "about-us",
  },
  {
    id: 3,
    context: "it-consulting",
  },
  {
    id: 4,
    context: "services",
  },
  ...Services.map((_, index) => ({ id: 5 + index, context: _.url })),
];
export default async function handler(req, res) {
  if (req.query.secret !== process.env.SECRET_VALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // We generate the XML sitemap with the data
  const sitemap = generateSiteMap(sitemaps);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();
}

function generateSiteMap(sitemaps) {
  return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
     xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" 
     xmlns:xhtml="http://www.w3.org/1999/xhtml" 
     xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" 
     xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" 
     xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
       <url>
         <loc>www.sharavinfotech.com</loc>
         <lastmod>2023-10-02</lastmod>
         <changefreq>daily</changefreq>
         <priority>1.0</priority>
       </url>
       ${sitemaps
         .map((sitemap) => {
           return `
         <url>
             <loc>www.sharavinfotech.com/${sitemap.context}</loc>
             <lastmod>2023-10-02</lastmod>
             <changefreq>daily</changefreq>
             <priority>1.0</priority>
         </url>
       `;
         })
         .join("")}
     </urlset>
   `;
}

export default function handler(req,res) {
  console.log('you came in robots')
  if (req.query.secret !== process.env.SECRET_VALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }
  res.setHeader("Content-Type", "text/plain; charset=UTF-8");

  const crawledHost = "www.sharavinfotech.com";

  res.send(`
    User-agent: *
    Allow: /
    Sitemap: ${crawledHost}/sitemap.xml
    `);
}

import { DETAIL_SERVICES } from "../content/services";

// Every public, indexable route. Used by the sitemap.
export const PUBLIC_ROUTES = [
  { path: "/", priority: "1.0" },
  { path: "/services", priority: "0.9" },
  ...DETAIL_SERVICES.map((service) => ({
    path: `/services/${service.slug}`,
    priority: "0.8",
  })),
  { path: "/it-consulting", priority: "0.8" },
  { path: "/about-us", priority: "0.7" },
  { path: "/contact", priority: "0.7" },
  { path: "/privacy", priority: "0.2" },
];

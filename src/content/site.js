// Company facts used across the site. Everything here is published content:
// change it only with the owner's confirmation (see docs/CONTENT_VERIFICATION.md).

export const SITE = {
  name: "Sharav Infotech",
  url: "https://sharavinfotech.com",
  description:
    "Sharav Infotech is a Mississauga-based technology consultancy that designs, builds, tests and supports software, web and cloud solutions for growing organizations.",
  email: "info@sharavinfotech.com",
  phone: {
    display: "(647) 564-6789",
    href: "tel:+16475646789",
    e164: "+1-647-564-6789",
  },
  address: {
    street: "2600 Skymark Ave, Unit 9, Suite 104",
    locality: "Mississauga",
    region: "ON",
    postalCode: "L4W 5B2",
    country: "CA",
    countryName: "Canada",
    mapUrl: "https://maps.app.goo.gl/tWt9o1T1nW3moDvY9",
  },
  // Only profiles confirmed to belong to the company are listed.
  social: [
    {
      id: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/company/sharavinfotech",
    },
  ],
  careersUrl: "https://ca.indeed.com/cmp/Sharav-Infotech-Inc./jobs",
};

export const NAVIGATION = [
  { id: "services", label: "Services", href: "/services", hasMenu: true },
  { id: "consulting", label: "IT Consulting", href: "/it-consulting" },
  { id: "approach", label: "Approach", href: "/#approach" },
  { id: "about", label: "About", href: "/about-us" },
];

export const CONTACT_CTA = { label: "Discuss your project", href: "/contact" };

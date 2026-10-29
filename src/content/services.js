// Service catalogue. Slugs match the URLs that were already indexed
// (/services/<slug>), so they must not be renamed without adding redirects.
// Technology names are limited to those already published by Sharav Infotech.

export const SERVICE_GROUPS = [
  {
    id: "build",
    label: "Design & Build",
    summary: "Shaping products and engineering the software behind them.",
  },
  {
    id: "platform",
    label: "Platform & Quality",
    summary: "Infrastructure, verification and the work that follows launch.",
  },
  {
    id: "advisory",
    label: "Advisory & Growth",
    summary: "Technology direction and reaching the right audience.",
  },
];

export const SERVICES = [
  {
    slug: "product-design",
    code: "01",
    group: "build",
    title: "Product Design & UX/UI",
    navTitle: "Product Design",
    short: "Interfaces people can use without a manual.",
    summary:
      "Product design for web applications, mobile apps, desktop software and connected devices, focused on helping users reach their goals with as little friction as possible.",
    overview: [
      "Good product design starts with understanding who will use a product and what they need to get done. We plan structure and navigation first, then define the visual language: layout, colour, typography, imagery and motion.",
      "The result is an interface that represents your brand, products and services clearly, is straightforward to navigate, and is specified precisely enough for engineers to build faithfully.",
    ],
    includes: [
      "UX research, information architecture and user flows",
      "UI design for web, mobile and desktop applications",
      "Interactive prototypes for early validation",
      "Visual systems: layout, colour, typography and imagery",
      "Motion and interaction design",
    ],
    disciplines: ["UX/UI", "Web design", "Interactive design", "Motion design"],
    seoDescription:
      "Product design and UX/UI services from Sharav Infotech: research, information architecture, interface design and prototypes for web, mobile and desktop products.",
  },
  {
    slug: "web-development",
    code: "02",
    group: "build",
    title: "Web & Application Development",
    navTitle: "Web Development",
    short: "Web platforms built to be maintained, not just shipped.",
    summary:
      "Creating, building and maintaining websites and web applications, including the front end, server-side programming and database work behind them.",
    overview: [
      "We build websites and web applications that support lead generation and day-to-day operations. Work spans front-end interfaces, server-side logic, integrations and data storage.",
      "Throughout delivery we meet with you regularly to gather feedback, and after launch we provide training and support so your team can operate what we have built.",
    ],
    includes: [
      "Web application and website development",
      "Front-end engineering for responsive, accessible interfaces",
      "Server-side development and API integration",
      "Database design and management",
      "Handover, training and post-launch support",
    ],
    technologies: ["Java", "JSP", "Node.js", "React", "Angular", "Vue"],
    seoDescription:
      "Web and application development by Sharav Infotech: front-end, server-side and database engineering with Java, Node.js, React, Angular and Vue.",
  },
  {
    slug: "cloud-services",
    code: "03",
    group: "platform",
    title: "Cloud Services",
    navTitle: "Cloud Services",
    short: "Infrastructure that scales with the business.",
    summary:
      "Scalable, secure and flexible cloud environments that let organizations store, manage and access data and applications wherever their teams work.",
    overview: [
      "We help organizations modernize infrastructure, control costs and improve efficiency on cloud platforms such as AWS, Microsoft Azure and Google Cloud.",
      "Engagements cover migration planning and execution, deployment, security and ongoing management, so that the move to the cloud delivers practical value.",
    ],
    includes: [
      "Cloud migration of applications and data",
      "Infrastructure as a Service (IaaS) and Platform as a Service (PaaS) environments",
      "Cloud security configuration",
      "Backup and disaster recovery planning",
      "Managed monitoring, maintenance and optimization",
    ],
    technologies: ["AWS", "Microsoft Azure", "Google Cloud"],
    seoDescription:
      "Cloud services from Sharav Infotech: migration, IaaS and PaaS environments, cloud security, backup, disaster recovery and managed operations.",
  },
  {
    slug: "software-testing",
    code: "04",
    group: "platform",
    title: "Software Testing & Quality Engineering",
    navTitle: "Software Testing",
    short: "Evidence that it works before your users find out it doesn't.",
    summary:
      "Testing every aspect of a web application: functionality, usability, compatibility, accessibility, security and performance.",
    overview: [
      "Our testing approach aligns with Agile delivery. Its objective is simple: confirm that every feature performs as expected against the requirements you defined.",
      "Quality assurance runs across all phases of an engagement, so anomalies are identified early and high-risk issues are mitigated before they reach production.",
    ],
    includes: [
      "Functional and regression testing",
      "Usability review across devices and browsers",
      "Cross-browser testing on Chrome, Firefox, Safari and Edge",
      "Accessibility testing against WCAG AA criteria",
      "Security and performance checks",
    ],
    seoDescription:
      "Software testing and quality engineering by Sharav Infotech: functional, cross-browser, accessibility, security and performance testing aligned with Agile delivery.",
  },
  {
    slug: "launching-and-support",
    code: "05",
    group: "platform",
    title: "Application Launch & Support",
    navTitle: "Launch & Support",
    short: "Launch is the start of the work, not the end.",
    summary:
      "We launch applications and continue to maintain them alongside your team so they stay usable, secure and dependable.",
    overview: [
      "A new release always meets real users in ways nobody fully anticipated. For each launch we prepare an internal release guide describing how new functionality works, what to watch for, and what future iterations are planned.",
      "After launch we work with your personnel on maintenance, upgrades, reporting and documentation, so the application keeps performing as your organization changes.",
    ],
    includes: [
      "Scheduled database and server backups, maintenance and tuning",
      "Testing and deployment of OS and application upgrades and security patches",
      "Monthly reporting on metrics you define, such as uptime and maintenance activity",
      "System and user documentation updates",
      "System monitoring, notifications and alerting",
      "Analytics dashboards and search engine optimization reporting",
    ],
    seoDescription:
      "Application launch and ongoing support from Sharav Infotech: release planning, maintenance, patching, monitoring, reporting and documentation.",
  },
  {
    slug: "it-consulting",
    code: "06",
    group: "advisory",
    title: "IT Consulting",
    navTitle: "IT Consulting",
    short: "Technology decisions grounded in how your business works.",
    summary:
      "Assessment, strategy and implementation guidance that aligns technology investment with business goals.",
    href: "/it-consulting",
  },
  {
    slug: "digital-marketing",
    code: "07",
    group: "advisory",
    title: "Digital Marketing",
    navTitle: "Digital Marketing",
    short: "Being found by the people you want to reach.",
    summary:
      "Online strategies and channels, including search, social media, email, paid advertising and content, that help businesses reach their audience and grow.",
    overview: [
      "Our digital marketing work aims to strengthen your online presence, attract the right audience and convert visitors into customers.",
      "Because we also build websites, we can connect marketing to the technical foundations underneath it, from search-engine readiness to analytics.",
    ],
    includes: [
      "Search engine optimization (SEO)",
      "Social media marketing across platforms such as LinkedIn, Facebook and Instagram",
      "Pay-per-click (PPC) advertising campaigns",
      "Email marketing to nurture leads and retain customers",
      "Content marketing through articles, video and infographics",
    ],
    seoDescription:
      "Digital marketing services from Sharav Infotech: SEO, social media, pay-per-click advertising, email and content marketing.",
  },
];

export const serviceHref = (service) =>
  service.href ?? `/services/${service.slug}`;

export const DETAIL_SERVICES = SERVICES.filter((service) => !service.href);

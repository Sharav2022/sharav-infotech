// Homepage narrative content.

export const HERO = {
  eyebrow: "Software · Cloud · Quality · Consulting",
  // Rendered as three lines; the middle line carries the gradient.
  title: ["Engineering ideas into", "extraordinary", "digital experiences."],
  lede: "Sharav Infotech designs, develops, integrates and supports the software your business runs on, from first architecture sketch to years of dependable operation.",
  primary: { label: "Discuss your project", href: "/contact" },
  secondary: { label: "Explore our expertise", href: "#capabilities" },
  highlights: ["Architecture-first delivery", "Design to long-term support", "Based in Mississauga, Ontario"],
};

export const POSITIONING = {
  label: "Who we are",
  title:
    "A Mississauga engineering team for organizations that need technology to simply work.",
  body: [
    "We work with small and medium-sized organizations to design, implement, maintain and upgrade their technology systems. Some arrive with a product to build. Others have systems that have outgrown the way they were built.",
    "In both cases, we start by understanding the business, then make deliberate engineering choices that your team can live with long after launch.",
  ],
  problems: [
    {
      title: "Systems that no longer fit",
      body: "Ageing applications, manual workarounds and tools that do not talk to each other.",
    },
    {
      title: "Ideas without a delivery team",
      body: "A product or platform to launch, but no in-house capacity to design, build and test it.",
    },
    {
      title: "Uncertain technology direction",
      body: "Decisions about cloud, platforms and vendors that need an informed, independent view.",
    },
  ],
};

export const PROCESS = [
  {
    id: "discover",
    title: "Discover",
    work: "We assess your current systems, processes and goals, and talk with the people who will use what we build.",
    value: "A shared understanding of the problem worth solving, before money is spent solving it.",
    output: "Requirements · constraints · priorities",
  },
  {
    id: "architect",
    title: "Architect",
    work: "We shape the solution: structure, integrations, data, hosting and the trade-offs between them.",
    value: "A plan that scales with you and avoids costly rework later.",
    output: "Architecture · roadmap · estimate",
  },
  {
    id: "build",
    title: "Build",
    work: "We design and develop in short, reviewable iterations, meeting with you regularly to gather feedback.",
    value: "Visible progress and room to adjust as you learn.",
    output: "Working software, every iteration",
  },
  {
    id: "validate",
    title: "Validate",
    work: "We test functionality, usability, compatibility, accessibility, security and performance against your requirements.",
    value: "Confidence that the product behaves as specified, on the devices your users have.",
    output: "Test evidence · resolved defects",
  },
  {
    id: "launch",
    title: "Launch",
    work: "We plan the release, deploy it and prepare a release guide describing new functionality and what to watch for.",
    value: "A calm launch with your team prepared for real-world use.",
    output: "Production release · release guide",
  },
  {
    id: "evolve",
    title: "Evolve",
    work: "We maintain, patch, monitor and report, and plan the next phases alongside you.",
    value: "A system that keeps pace with your organization rather than falling behind it.",
    output: "Maintenance · reporting · next phase",
  },
];

// Disciplines and the specific technologies already published for them.
export const EXPERTISE = [
  {
    id: "software",
    title: "Software Engineering",
    detail: "Server-side applications and business logic.",
    stack: ["Java", "JSP", "Node.js"],
  },
  {
    id: "web",
    title: "Web Applications",
    detail: "Responsive interfaces and web platforms.",
    stack: ["React", "Angular", "Vue"],
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure",
    detail: "Migration, IaaS / PaaS, backup and recovery.",
    stack: ["AWS", "Microsoft Azure", "Google Cloud"],
  },
  {
    id: "integration",
    title: "APIs & Integration",
    detail: "Connecting systems so data flows where it is needed.",
    stack: ["API integration", "Data migration"],
  },
  {
    id: "modernization",
    title: "Architecture & Modernization",
    detail: "Assessing and upgrading systems that have outgrown their design.",
    stack: ["Assessment", "Roadmapping"],
  },
  {
    id: "quality",
    title: "Quality Engineering",
    detail: "Verification across browsers, devices and standards.",
    stack: ["Cross-browser", "WCAG AA", "Regression"],
  },
  {
    id: "experience",
    title: "Product Experience",
    detail: "Research-led UX/UI and interaction design.",
    stack: ["UX/UI", "Prototyping", "Motion"],
  },
];

// Illustrative engagement patterns. These are NOT client case studies and
// must stay labelled as demonstrations until approved case studies exist.
export const DEMONSTRATIONS = [
  {
    id: "modernize",
    label: "Modernization",
    title: "Replacing a legacy line-of-business application",
    challenge:
      "A business-critical web application has become hard to change, depends on outdated libraries and relies on manual workarounds.",
    approach:
      "Assess the current system, identify what must be preserved, and plan an incremental replacement rather than a risky all-at-once rewrite.",
    solution:
      "A modern web application with a clear API layer, migrated data and a responsive interface, released in stages.",
    considerations: ["Data migration and validation", "Running old and new in parallel", "Regression testing"],
  },
  {
    id: "cloud",
    label: "Cloud",
    title: "Moving on-premise workloads to the cloud",
    challenge:
      "Servers are reaching end of life, backups are inconsistent and capacity cannot be scaled when demand changes.",
    approach:
      "Inventory workloads, select an appropriate platform and service model, and define backup and recovery before migration begins.",
    solution:
      "Applications and data running in a managed cloud environment with monitoring, alerting and documented recovery.",
    considerations: ["Security configuration", "Cost visibility", "Disaster recovery testing"],
  },
  {
    id: "quality",
    label: "Quality",
    title: "Introducing a quality practice to an existing product",
    challenge:
      "Releases regularly introduce defects, and issues are discovered by customers rather than before launch.",
    approach:
      "Map critical user journeys, establish test coverage across browsers and devices, and integrate testing into each iteration.",
    solution:
      "A repeatable test process with regression checks, accessibility review and clear release criteria.",
    considerations: ["Prioritizing by risk", "Cross-browser coverage", "WCAG AA review"],
  },
];

export const DIFFERENTIATORS = [
  {
    title: "Judgment before code",
    body: "We begin with an assessment of your business and systems, so recommendations are grounded in your situation rather than a default stack.",
  },
  {
    title: "Built to be maintained",
    body: "Scalable designs and clean, documented code, so future phases build on solid ground rather than workarounds.",
  },
  {
    title: "Transparent, iterative delivery",
    body: "Short cycles and regular reviews mean you see progress, give feedback and change direction while it is still inexpensive.",
  },
  {
    title: "One team, end to end",
    body: "Design, development, testing, cloud and support under one roof, with no hand-offs between vendors.",
  },
  {
    title: "With you after launch",
    body: "We stay on to maintain the application, help you go to market and build the phases that come next.",
  },
  {
    title: "Local and accountable",
    body: "An independently owned team based in Mississauga, Ontario, available to meet and work alongside you.",
  },
];

export const ENGAGEMENT = [
  {
    title: "Start a conversation",
    body: "Tell us about your organization and what you want to achieve, using the form or by phone or email.",
  },
  {
    title: "Discovery session",
    body: "We explore your goals, users, current systems and constraints together.",
  },
  {
    title: "Proposal",
    body: "You receive a recommended approach, scope, timeline and estimate, in plain language.",
  },
  {
    title: "Kick-off",
    body: "We agree on ways of working, introduce the team and begin the first iteration.",
  },
];

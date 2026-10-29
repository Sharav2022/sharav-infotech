# Content Verification Checklist

The redesign publishes only content that already appeared on the site and could be
treated as owner-approved. The items below need explicit confirmation from Sharav
Infotech before they are published, changed or restored.

## A. Confirm before launch

| # | Item | Where | Question |
|---|---|---|---|
| A1 | Privacy notice | `pages/privacy.js` | Review for accuracy and legal sufficiency (PIPEDA). Confirm SendGrid and Vercel are the only processors. |
| A2 | Legal entity name | Footer, JSON-LD | Indeed lists "Sharav Infotech Inc.". Should the copyright line use the incorporated name? |
| A3 | Address, phone, email | `src/content/site.js` | Still current? |
| A4 | LinkedIn company URL | `src/content/site.js` | `linkedin.com/company/sharavinfotech` is the official page? |
| A5 | Ruma Roy LinkedIn | `src/content/company.js` | Add a profile URL, or leave none (current) |
| A6 | Cross-browser list | Software Testing | Updated "IE" to "Edge" since Internet Explorer is retired. OK? |
| A7 | Cloud platforms | Cloud Services, expertise matrix | AWS, Azure and Google Cloud were listed on the live site. Confirm active capability on all three. |
| A8 | Team photos | `public/images/team/` | Current photos are 379×379 and 600×826. Higher-resolution portraits (≥ 1200px) are recommended. |
| A9 | Logo | `public/brand/` | Approve Concept A, Concept B, or request changes |

## B. Withheld until evidence is provided

| Claim (previous site) | What is needed to restore it |
|---|---|
| "40+ Clients Already Served" | Internal confirmation of the figure |
| "Reviewed on Clutch · 20 reviews · 5 stars" | Link to the Clutch profile showing the reviews |
| Testimonials from Anshu Garg, Kiel Paul, Chris Howard | Written permission from each person, plus company/role |
| "20+ Tested projects" | Internal confirmation |
| "24/7 support", "lifetime support" | Confirmation that this is contractually offered |
| "Fixed fee package", "expertise of twenty" | Confirmation of the commercial model |

## C. Content opportunities

- **Case studies** (`DEMONSTRATIONS` in `src/content/home.js`): replace the labelled
  demonstrations with approved client work. Each needs challenge, approach, solution,
  engineering considerations, and an outcome the client agrees to publish.
- **Client logos**: only with written permission.
- **Insights**: add only when there is a commitment to publish regularly.

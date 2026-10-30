import PageHero from "../src/components/layout/PageHero";
import Seo from "../src/components/layout/Seo";
import { SITE } from "../src/content/site";
import pageClasses from "../src/styles/Pages.module.css";

// Plain-language notice describing what this website actually collects.
// Must be reviewed by the company before publication: see docs/CONTENT_VERIFICATION.md.
const LAST_UPDATED = "October 28, 2026";

export default function PrivacyPage() {
  return (
    <>
      <Seo
        title="Privacy Notice"
        path="/privacy"
        description="How Sharav Infotech collects and uses personal information submitted through this website."
      />
      <PageHero label="Privacy" title="Privacy notice" lede={`Last updated ${LAST_UPDATED}.`} />

      <section className="section">
        <div className={`container ${pageClasses.prose}`}>
          <p>
            This notice explains how {SITE.name} handles personal information
            submitted through sharavinfotech.com. We aim to collect only what
            we need to respond to you, consistent with Canada&rsquo;s Personal
            Information Protection and Electronic Documents Act (PIPEDA).
          </p>

          <h2>What we collect</h2>
          <p>
            When you use the contact form we receive the details you choose to
            provide: your name, email address and, optionally, your phone
            number, organization, area of interest and message.
          </p>
          <p>
            This website does not use advertising or analytics cookies. Our
            hosting provider may process standard technical information, such
            as IP addresses, to deliver and secure the website.
          </p>

          <h2>How we use it</h2>
          <ul>
            <li>To respond to your enquiry and discuss potential work.</li>
            <li>To keep a record of our correspondence with you.</li>
          </ul>
          <p>We do not sell your information or use it for unrelated marketing.</p>

          <h2>Service providers</h2>
          <p>
            Form submissions are delivered to us by email through SendGrid
            (Twilio), and the website is hosted by Vercel. These providers may
            process data outside Canada, including in the United States.
          </p>

          <h2>Retention and your choices</h2>
          <p>
            We keep enquiry correspondence only as long as needed for the
            purposes above. You may ask to access, correct or delete the
            personal information we hold about you.
          </p>

          <h2>Contact</h2>
          <p>
            For privacy questions or requests, email{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or write to us at{" "}
            {SITE.address.street}, {SITE.address.locality},{" "}
            {SITE.address.region} {SITE.address.postalCode}.
          </p>
        </div>
      </section>
    </>
  );
}


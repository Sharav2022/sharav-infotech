import ContactForm from "../src/components/contact/ContactForm";
import PageHero from "../src/components/layout/PageHero";
import Seo from "../src/components/layout/Seo";
import Icon from "../src/components/ui/Icon";
import { ENGAGEMENT } from "../src/content/home";
import { SITE } from "../src/content/site";
import classes from "../src/styles/Contact.module.css";

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact"
        path="/contact"
        description="Contact Sharav Infotech about a software, web, cloud, testing or IT consulting project. Call (647) 564-6789 or send us your project details."
      />
      <PageHero
        label="Contact"
        title="Tell us what you are building."
        lede="Share a few details about your organization and project. The more context you give, the more useful our first conversation will be."
      />

      <section className="section">
        <div className={`container ${classes.layout}`}>
          <div className={classes.formCol}>
            <ContactForm />
          </div>

          <aside className={classes.aside} aria-label="Other ways to reach us">
            <div className={classes.block}>
              <p className="label">Direct</p>
              <a href={SITE.phone.href} className={classes.channel}>
                <Icon name="phone" />
                <span>
                  <strong>{SITE.phone.display}</strong>
                  <small>Call during business hours</small>
                </span>
              </a>
              <a href={`mailto:${SITE.email}`} className={classes.channel}>
                <Icon name="mail" />
                <span>
                  <strong>{SITE.email}</strong>
                  <small>For enquiries and existing clients</small>
                </span>
              </a>
              <a href={SITE.address.mapUrl} target="_blank" rel="noopener noreferrer" className={classes.channel}>
                <Icon name="map-pin" />
                <span>
                  <strong>{SITE.address.street}</strong>
                  <small>
                    {SITE.address.locality}, {SITE.address.region} {SITE.address.postalCode}
                  </small>
                </span>
              </a>
            </div>

            <div className={classes.block}>
              <p className="label">What happens next</p>
              <ol role="list" className={classes.next}>
                {ENGAGEMENT.slice(1).map((step, index) => (
                  <li key={step.title}>
                    <span>{index + 1}</span>
                    <div>
                      <strong>{step.title}</strong>
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

ContactPage.layoutProps = { headerTone: "inverse" };

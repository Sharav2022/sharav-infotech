import Image from "next/image";
import CtaBand from "../../src/components/layout/CtaBand";
import PageHero from "../../src/components/layout/PageHero";
import Seo from "../../src/components/layout/Seo";
import Button from "../../src/components/ui/Button";
import Icon from "../../src/components/ui/Icon";
import Reveal from "../../src/components/ui/Reveal";
import SectionHeading from "../../src/components/ui/SectionHeading";
import { ABOUT, CAREERS, TEAM } from "../../src/content/company";
import { SITE } from "../../src/content/site";
import pageClasses from "../../src/styles/Pages.module.css";
import classes from "../../src/styles/About.module.css";

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Us"
        path="/about-us"
        description="Sharav Infotech is an independently owned technology consultancy in Mississauga, Ontario, helping organizations design, build, test and support their technology."
      />
      <PageHero
        label="About us"
        title={
          <>
            Engineers, designers and <span className="gradient-text">long-term partners.</span>
          </>
        }
        lede={ABOUT.intro}
        image="/images/3d/brand.webp"
      />

      <section className="section" aria-labelledby="story-title">
        <div className={`container ${pageClasses.split}`}>
          <SectionHeading label="Who we are" id="story-title" title="Technology that serves the organization, not the other way around." />
          <Reveal className={pageClasses.prose}>
            {ABOUT.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section surface-tint" aria-labelledby="principles-title">
        <div className={`container ${pageClasses.split}`}>
          <div className={pageClasses.stickyAside}>
            <SectionHeading label="How we work" id="principles-title" title="Five principles behind every engagement." />
          </div>
          <ol role="list" className={pageClasses.ruledList}>
            {ABOUT.principles.map((item, index) => (
              <Reveal as="li" key={item.title} className={pageClasses.ruledItem}>
                <span className={pageClasses.index}>0{index + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="team-title">
        <div className="container">
          <SectionHeading label="Leadership" id="team-title" title="The people you will work with." />
          <ul role="list" className={classes.team}>
            {TEAM.map((member, index) => (
              <Reveal as="li" key={member.id} delay={index * 100} className={classes.member}>
                <div className={classes.portrait}>
                  <Image src={member.image} alt={`Portrait of ${member.name}`} fill sizes="(min-width: 768px) 280px, 45vw" />
                </div>
                <div className={classes.memberText}>
                  <h3>{member.name}</h3>
                  {member.role && <p className="label">{member.role}</p>}
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={classes.memberLink}>
                      <Icon name="linkedin" size={18} />
                      <span>LinkedIn<span className="visually-hidden"> profile of {member.name}</span></span>
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section surface-tint" aria-labelledby="location-title">
        <div className={`container ${classes.twoUp}`}>
          <Reveal className={pageClasses.aside}>
            <p className="label">Location</p>
            <h2 id="location-title">Based in Mississauga, Ontario</h2>
            <address className={classes.address}>
              {SITE.address.street}
              <br />
              {SITE.address.locality}, {SITE.address.region} {SITE.address.postalCode}
              <br />
              {SITE.address.countryName}
            </address>
            <Button href={SITE.address.mapUrl} variant="text" icon="arrow-up-right">
              Open in Google Maps
            </Button>
          </Reveal>
          <Reveal className={pageClasses.aside} delay={100}>
            <p className="label">Careers</p>
            <h2>{CAREERS.title}</h2>
            <p>{CAREERS.body}</p>
            <Button href={SITE.careersUrl} variant="text" icon="arrow-up-right">
              See current openings on Indeed
            </Button>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}


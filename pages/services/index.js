import Link from "next/link";
import CtaBand from "../../src/components/layout/CtaBand";
import PageHero from "../../src/components/layout/PageHero";
import Seo from "../../src/components/layout/Seo";
import Icon from "../../src/components/ui/Icon";
import Reveal from "../../src/components/ui/Reveal";
import { SERVICE_GROUPS, SERVICES, serviceHref } from "../../src/content/services";
import classes from "../../src/styles/Services.module.css";

export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Services"
        path="/services"
        description="Product design, web and application development, cloud services, software testing, launch and support, IT consulting and digital marketing from Sharav Infotech."
      />
      <PageHero
        label="Services"
        title="Engineering services across the product lifecycle."
        lede="Seven disciplines delivered by one team, so design, engineering, quality and operations stay connected from the first sketch to long-term support."
      />

      {SERVICE_GROUPS.map((group, groupIndex) => (
        <section
          key={group.id}
          className={`section ${groupIndex % 2 ? classes.alt : ""}`}
          aria-labelledby={`group-${group.id}`}
        >
          <div className={`container ${classes.groupLayout}`}>
            <Reveal className={classes.groupIntro}>
              <p className="label">
                Group {groupIndex + 1} / {SERVICE_GROUPS.length}
              </p>
              <h2 id={`group-${group.id}`}>{group.label}</h2>
              <p>{group.summary}</p>
            </Reveal>
            <div className={classes.serviceList}>
              {SERVICES.filter((s) => s.group === group.id).map((service, index) => (
                <Reveal as="article" key={service.slug} delay={index * 80} className={classes.service}>
                  <div className={classes.serviceHead}>
                    <span className={classes.code}>{service.code}</span>
                    <h3>
                      <Link href={serviceHref(service)} className={classes.serviceLink}>
                        {service.title}
                      </Link>
                    </h3>
                  </div>
                  <p className={classes.summary}>{service.summary}</p>
                  {(service.technologies || service.disciplines) && (
                    <ul role="list" className={classes.tags}>
                      {(service.technologies || service.disciplines).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  <span className={classes.more} aria-hidden="true">
                    Explore {service.navTitle.toLowerCase()} <Icon name="arrow-right" size={16} />
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <CtaBand title="Not sure which service fits? Start with a conversation." />
    </>
  );
}

ServicesPage.layoutProps = { headerTone: "inverse" };

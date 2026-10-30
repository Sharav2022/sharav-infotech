import Image from "next/image";
import Link from "next/link";
import CtaBand from "../../src/components/layout/CtaBand";
import PageHero from "../../src/components/layout/PageHero";
import Seo from "../../src/components/layout/Seo";
import Icon from "../../src/components/ui/Icon";
import Reveal from "../../src/components/ui/Reveal";
import { SERVICE_GROUPS, SERVICES, serviceHref, serviceImage } from "../../src/content/services";
import { CONSULTING } from "../../src/content/company";
import classes from "../../src/styles/Services.module.css";

// IT Consulting has its own page; show a preview of its phases instead of a scope list.
const previewFor = (service) =>
  service.includes?.slice(0, 3) ?? CONSULTING.phases.map((phase) => `${phase.label}: ${phase.aspects[0].title}`);

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
        title={
          <>
            Engineering services across the <span className="gradient-text">product lifecycle.</span>
          </>
        }
        lede="Seven disciplines delivered by one team, so design, engineering, quality and operations stay connected from the first sketch to long-term support."
        image="/images/3d/hero.webp"
      >
        <nav aria-label="Service groups" className={classes.jump}>
          {SERVICE_GROUPS.map((group) => (
            <a key={group.id} href={`#${group.id}`}>
              {group.label}
            </a>
          ))}
        </nav>
      </PageHero>

      {SERVICE_GROUPS.map((group, groupIndex) => (
        <section key={group.id} id={group.id} className={`section ${groupIndex % 2 ? "surface-tint" : ""}`} aria-labelledby={`group-${group.id}`}>
          <div className="container">
            <Reveal className={classes.groupIntro}>
              <p className="label">
                {String(groupIndex + 1).padStart(2, "0")} · {group.label}
              </p>
              <h2 id={`group-${group.id}`}>{group.summary}</h2>
            </Reveal>

            <div className={classes.rows}>
              {SERVICES.filter((s) => s.group === group.id).map((service, index) => (
                <Reveal as="article" key={service.slug} className={classes.row} data-flip={index % 2 ? "" : undefined}>
                  <div className={classes.visual}>
                    <Image src={serviceImage(service)} alt="" fill sizes="(min-width: 1024px) 45vw, 90vw" />
                    <span className={classes.code}>{service.code}</span>
                  </div>
                  <div className={classes.copy}>
                    <h3>
                      <Link href={serviceHref(service)} className={classes.titleLink}>
                        {service.title}
                      </Link>
                    </h3>
                    <p className={classes.short}>{service.short}</p>
                    <p>{service.summary}</p>
                    <ul role="list" className={classes.preview}>
                      {previewFor(service).map((item) => (
                        <li key={item}>
                          <Icon name="check" size={18} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {(service.technologies || service.disciplines) && (
                      <ul role="list" className={classes.tags}>
                        {(service.technologies || service.disciplines).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                    <span className={classes.more} aria-hidden="true">
                      Explore {service.navTitle.toLowerCase()} <Icon name="arrow-right" size={18} />
                    </span>
                  </div>
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

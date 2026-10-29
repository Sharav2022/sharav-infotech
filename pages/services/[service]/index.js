import Link from "next/link";
import CtaBand from "../../../src/components/layout/CtaBand";
import PageHero from "../../../src/components/layout/PageHero";
import Seo from "../../../src/components/layout/Seo";
import Icon from "../../../src/components/ui/Icon";
import Reveal from "../../../src/components/ui/Reveal";
import SectionHeading from "../../../src/components/ui/SectionHeading";
import { PROCESS } from "../../../src/content/home";
import { DETAIL_SERVICES, SERVICES, serviceHref } from "../../../src/content/services";
import { SITE } from "../../../src/content/site";
import pageClasses from "../../../src/styles/Pages.module.css";
import classes from "../../../src/styles/Services.module.css";

export default function ServicePage({ slug }) {
  const service = SERVICES.find((item) => item.slug === slug);
  const related = SERVICES.filter(
    (item) => item.slug !== slug && (item.group === service.group || item.slug === "it-consulting")
  ).slice(0, 3);
  const stack = service.technologies || service.disciplines;

  return (
    <>
      <Seo
        title={service.title}
        path={`/services/${service.slug}`}
        description={service.seoDescription}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.summary,
          serviceType: service.title,
          areaServed: "CA",
          provider: { "@id": `${SITE.url}/#organization`, name: SITE.name },
          url: `${SITE.url}/services/${service.slug}`,
        }}
      />
      <PageHero
        label={service.navTitle}
        title={service.title}
        lede={service.summary}
        trail={[{ label: "Services", href: "/services" }]}
      >
        <p className={classes.detailCode}>Service {service.code} / 07</p>
      </PageHero>

      <section className="section" aria-labelledby="overview-title">
        <div className={`container ${pageClasses.split}`}>
          <Reveal className={pageClasses.prose}>
            <p className="label">Overview</p>
            <h2 id="overview-title" className="visually-hidden">
              Overview
            </h2>
            {service.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
          {stack && (
            <Reveal as="aside" delay={120} className={`${pageClasses.aside} ${pageClasses.stickyAside}`}>
              <p className="label">{service.technologies ? "Technologies" : "Disciplines"}</p>
              <ul role="list" className={pageClasses.tags}>
                {stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </section>

      <section className={`section ${pageClasses.raised}`} aria-labelledby="includes-title">
        <div className={`container ${pageClasses.split}`}>
          <SectionHeading label="Scope" title="What the service includes" id="includes-title" />
          <Reveal as="ul" role="list" className={pageClasses.checklist}>
            {service.includes.map((item) => (
              <li key={item}>
                <Icon name="check" size={20} />
                <span>{item}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="how-title">
        <div className="container">
          <SectionHeading
            label="How we deliver"
            title="The same disciplined process, every engagement."
            id="how-title"
            lede="Each service follows our six-stage delivery approach, scaled to the size of the work."
          />
          <Reveal as="ol" role="list" className={pageClasses.cardGrid} style={{ marginTop: "var(--space-12)" }}>
            {PROCESS.map((stage, index) => (
              <li key={stage.id} className={pageClasses.ruledItem}>
                <span className={pageClasses.index}>0{index + 1}</span>
                <div>
                  <h3>{stage.title}</h3>
                  <p>{stage.work}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className={`section ${pageClasses.raised}`} aria-labelledby="related-title">
        <div className="container">
          <p className="label" id="related-title">
            Related services
          </p>
          <ul role="list" className={classes.related} style={{ marginTop: "var(--space-6)" }}>
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={serviceHref(item)} className={classes.relatedLink}>
                  <span className={classes.code}>{item.code}</span>
                  <span>
                    <strong>{item.navTitle}</strong>
                    <small>{item.short}</small>
                  </span>
                  <Icon name="arrow-right" size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={`Talk to us about ${service.navTitle.toLowerCase()}.`} />
    </>
  );
}

ServicePage.layoutProps = { headerTone: "inverse" };

export function getStaticPaths() {
  return {
    paths: DETAIL_SERVICES.map((service) => ({ params: { service: service.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  return { props: { slug: params.service } };
}

import Link from "next/link";
import ProcessExplorer from "../src/components/home/ProcessExplorer";
import SystemDiagram from "../src/components/home/SystemDiagram";
import Seo, { organizationJsonLd } from "../src/components/layout/Seo";
import Button from "../src/components/ui/Button";
import Icon from "../src/components/ui/Icon";
import Reveal from "../src/components/ui/Reveal";
import SectionHeading from "../src/components/ui/SectionHeading";
import {
  DEMONSTRATIONS,
  DIFFERENTIATORS,
  ENGAGEMENT,
  EXPERTISE,
  HERO,
  POSITIONING,
} from "../src/content/home";
import { SERVICE_GROUPS, SERVICES, serviceHref } from "../src/content/services";
import { SITE } from "../src/content/site";
import classes from "../src/styles/Home.module.css";

export default function HomePage() {
  return (
    <>
      <Seo
        path="/"
        description="Sharav Infotech designs, develops, tests and supports software, web and cloud solutions for organizations across Canada. Based in Mississauga, Ontario."
        jsonLd={organizationJsonLd()}
      />

      {/* A — Hero */}
      <section className={`theme-inverse ${classes.hero}`} aria-labelledby="hero-title">
        <div className={`blueprint-grid ${classes.heroGrid}`} aria-hidden="true" />
        <div className={`container-wide ${classes.heroInner}`}>
          <div className={classes.heroCopy}>
            <p className={`label ${classes.heroEyebrow}`}>{HERO.eyebrow}</p>
            <h1 id="hero-title" className={classes.heroTitle}>
              <span>{HERO.title[0]}</span>
              <span className={classes.heroTitleAccent}>{HERO.title[1]}</span>
            </h1>
            <p className={`lede ${classes.heroLede}`}>{HERO.lede}</p>
            <div className={classes.heroActions}>
              <Button href={HERO.primary.href} size="lg">
                {HERO.primary.label}
              </Button>
              <Button href={HERO.secondary.href} variant="secondary" size="lg" icon="chevron-down">
                {HERO.secondary.label}
              </Button>
            </div>
            <p className={classes.heroMeta}>
              <span className={classes.metaDot} aria-hidden="true" />
              Mississauga, Ontario · Serving organizations across Canada
            </p>
          </div>
          <div className={classes.heroVisual}>
            <SystemDiagram />
          </div>
        </div>
      </section>

      {/* B — Positioning */}
      <section className="section" aria-labelledby="positioning-title">
        <div className={`container ${classes.positioning}`}>
          <SectionHeading index="01" label={POSITIONING.label} title={POSITIONING.title} id="positioning-title" />
          <Reveal className={classes.positioningBody} delay={120}>
            {POSITIONING.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
          <ol role="list" className={classes.problems}>
            {POSITIONING.problems.map((problem, index) => (
              <Reveal as="li" key={problem.title} delay={index * 90} className={classes.problem}>
                <span className={classes.problemIndex}>P.0{index + 1}</span>
                <h3>{problem.title}</h3>
                <p>{problem.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* C — Capabilities */}
      <section id="capabilities" className={`section ${classes.capabilities}`} aria-labelledby="capabilities-title">
        <div className="container">
          <SectionHeading
            index="02"
            label="Capabilities"
            id="capabilities-title"
            title="Seven disciplines, one accountable team."
            lede="From the first interface sketch to the infrastructure underneath and the support that follows launch."
          />
          <div className={classes.groups}>
            {SERVICE_GROUPS.map((group) => (
              <Reveal key={group.id} className={classes.group}>
                <div className={classes.groupHead}>
                  <h3 className={classes.groupTitle}>{group.label}</h3>
                  <p>{group.summary}</p>
                </div>
                <ul role="list" className={classes.serviceRows}>
                  {SERVICES.filter((s) => s.group === group.id).map((service) => (
                    <li key={service.slug}>
                      <Link href={serviceHref(service)} className={classes.serviceRow}>
                        <span className={classes.serviceCode}>{service.code}</span>
                        <span className={classes.serviceText}>
                          <span className={classes.serviceTitle}>{service.title}</span>
                          <span className={classes.serviceShort}>{service.short}</span>
                        </span>
                        <Icon name="arrow-up-right" size={22} className={classes.serviceArrow} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* D — Challenge to solution */}
      <section id="approach" className="section theme-inverse" aria-labelledby="approach-title">
        <div className="container">
          <SectionHeading
            index="03"
            label="From challenge to solution"
            id="approach-title"
            title="A delivery process you can see into."
            lede="Six stages, each with a clear purpose and a tangible output. Select a stage to see what happens and why it matters."
          />
          <Reveal className={classes.processWrap}>
            <ProcessExplorer />
          </Reveal>
        </div>
      </section>

      {/* E — Technology expertise */}
      <section className="section" aria-labelledby="expertise-title">
        <div className="container">
          <SectionHeading
            index="04"
            label="Technology expertise"
            id="expertise-title"
            title="Engineering disciplines and the tools behind them."
          />
          <Reveal className={classes.matrix}>
            {EXPERTISE.map((area, index) => (
              <div key={area.id} className={classes.matrixCell}>
                <span className={classes.matrixIndex}>{String(index + 1).padStart(2, "0")}</span>
                <h3 className={classes.matrixTitle}>{area.title}</h3>
                <p className={classes.matrixDetail}>{area.detail}</p>
                <ul role="list" className={classes.tags}>
                  {area.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
            <div className={`${classes.matrixCell} ${classes.matrixCta}`}>
              <p>Working with a stack that is not listed here?</p>
              <Button href="/contact" variant="text">
                Ask us about it
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* F — Featured work (capability demonstrations) */}
      <section className={`section ${classes.demos}`} aria-labelledby="demos-title">
        <div className="container">
          <SectionHeading
            index="05"
            label="Capability demonstrations"
            id="demos-title"
            title="How we approach typical engagements."
            lede="These are illustrative scenarios that show our method. They are not client case studies; detailed project references are available on request."
          />
          <div className={classes.demoGrid}>
            {DEMONSTRATIONS.map((demo, index) => (
              <Reveal as="article" key={demo.id} delay={index * 90} className={classes.demo}>
                <p className={classes.demoTag}>
                  <span>Demonstration</span>
                  <span>{demo.label}</span>
                </p>
                <h3 className={classes.demoTitle}>{demo.title}</h3>
                <dl className={classes.demoBody}>
                  <div>
                    <dt className="label">Challenge</dt>
                    <dd>{demo.challenge}</dd>
                  </div>
                  <div>
                    <dt className="label">Approach</dt>
                    <dd>{demo.approach}</dd>
                  </div>
                  <div>
                    <dt className="label">Solution</dt>
                    <dd>{demo.solution}</dd>
                  </div>
                  <div>
                    <dt className="label">Engineering considerations</dt>
                    <dd>
                      <ul role="list" className={classes.tags}>
                        {demo.considerations.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* G — Why Sharav */}
      <section className="section" aria-labelledby="why-title">
        <div className={`container ${classes.why}`}>
          <div className={classes.whyIntro}>
            <SectionHeading
              index="06"
              label="Why Sharav"
              id="why-title"
              title="What you can expect from working with us."
            />
          </div>
          <ol role="list" className={classes.whyList}>
            {DIFFERENTIATORS.map((item, index) => (
              <Reveal as="li" key={item.title} className={classes.whyItem}>
                <span className={classes.whyIndex}>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* H — Engagement */}
      <section className={`section ${classes.engagement}`} aria-labelledby="engage-title">
        <div className="container">
          <SectionHeading
            index="07"
            label="Getting started"
            id="engage-title"
            title="Four steps from first message to first iteration."
          />
          <ol role="list" className={classes.steps}>
            {ENGAGEMENT.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 90} className={classes.stepItem}>
                <span className={classes.stepNum}>Step {index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* I — Closing CTA */}
      <section className={`theme-inverse ${classes.closing}`} aria-labelledby="closing-title">
        <div className={`blueprint-grid ${classes.heroGrid}`} aria-hidden="true" />
        <div className={`container ${classes.closingInner}`}>
          <Reveal>
            <p className="label">Start a project</p>
            <h2 id="closing-title" className={classes.closingTitle}>
              Have a system to build, fix or modernize?
            </h2>
            <p className={`lede ${classes.closingLede}`}>
              Tell us where you are and where you need to be. We will reply to
              arrange a conversation with someone who can talk through the
              engineering.
            </p>
            <div className={classes.heroActions}>
              <Button href="/contact" size="lg" variant="inverse">
                Discuss your project
              </Button>
              <Button href={SITE.phone.href} size="lg" variant="secondary" icon="phone">
                {SITE.phone.display}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

HomePage.layoutProps = { headerTone: "inverse" };

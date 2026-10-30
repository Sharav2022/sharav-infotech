import Image from "next/image";
import Link from "next/link";
import Hero3D from "../src/components/home/Hero3D";
import ProcessExplorer from "../src/components/home/ProcessExplorer";
import CtaBand from "../src/components/layout/CtaBand";
import Seo, { organizationJsonLd } from "../src/components/layout/Seo";
import Button from "../src/components/ui/Button";
import Icon from "../src/components/ui/Icon";
import Reveal from "../src/components/ui/Reveal";
import SectionHeading from "../src/components/ui/SectionHeading";
import Tilt from "../src/components/ui/Tilt";
import {
  DEMONSTRATIONS,
  DIFFERENTIATORS,
  ENGAGEMENT,
  EXPERTISE,
  HERO,
  POSITIONING,
} from "../src/content/home";
import { SERVICES, serviceHref, serviceImage } from "../src/content/services";
import classes from "../src/styles/Home.module.css";

// Bento layout spans for the seven capability tiles (12-column grid).
const BENTO = ["wide", "narrow", "narrow", "wide", "third", "third", "third"];
const DEMO_IMAGES = {
  modernize: "/images/3d/web-development.webp",
  cloud: "/images/3d/cloud-services.webp",
  quality: "/images/3d/software-testing.webp",
};
const ORB_HUES = ["royal", "violet", "cyan", "teal", "royal", "violet", "cyan"];

export default function HomePage() {
  return (
    <>
      <Seo
        path="/"
        description="Sharav Infotech designs, develops, tests and supports software, web and cloud solutions for organizations across Canada. Based in Mississauga, Ontario."
        jsonLd={organizationJsonLd()}
      />

      {/* A: Hero */}
      <section className={`luminous ${classes.hero}`} aria-labelledby="hero-title">
        <div className={`grid-lines ${classes.heroGrid}`} aria-hidden="true" />
        <div className={`container-wide ${classes.heroInner}`}>
          <div className={classes.heroCopy}>
            <p className="label">{HERO.eyebrow}</p>
            <h1 id="hero-title" className={classes.heroTitle}>
              <span>{HERO.title[0]}</span>{" "}
              <span className="gradient-text">{HERO.title[1]}</span>{" "}
              <span>{HERO.title[2]}</span>
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
            <ul role="list" className={classes.highlights}>
              {HERO.highlights.map((item) => (
                <li key={item}>
                  <Icon name="check" size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={classes.heroVisual}>
            <Hero3D />
            <div className={`${classes.chip} ${classes.chipA}`} aria-hidden="true">
              <span className={classes.chipDot} />
              <span>
                <strong>Architecture</strong>
                <small>API · Services · Data</small>
              </span>
            </div>
            <div className={`${classes.chip} ${classes.chipB}`} aria-hidden="true">
              <span className={`${classes.chipDot} ${classes.chipDotTeal}`} />
              <span>
                <strong>Validated</strong>
                <small>Every release, every browser</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* B: Positioning */}
      <section className="section" aria-labelledby="positioning-title">
        <div className="container">
          <Reveal className={classes.statementWrap}>
            <p className="label">01 · {POSITIONING.label}</p>
            <h2 id="positioning-title" className={classes.statement}>
              A Mississauga engineering team for organizations that need
              technology to <span className="gradient-text">simply work</span>.
            </h2>
          </Reveal>
          <div className={classes.positioning}>
            <Reveal className={classes.positioningBody} delay={100}>
              {POSITIONING.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Reveal>
            <ol role="list" className={classes.problems}>
              {POSITIONING.problems.map((problem, index) => (
                <Reveal as="li" key={problem.title} delay={index * 110} className={`glass-card ${classes.problem}`}>
                  <span className={`${classes.orb} ${classes[ORB_HUES[index + 1]]}`} aria-hidden="true">
                    {index + 1}
                  </span>
                  <div>
                    <h3>{problem.title}</h3>
                    <p>{problem.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* C: Capabilities (bento with 3D renders) */}
      <section id="capabilities" className={`section surface-tint ${classes.capabilities}`} aria-labelledby="capabilities-title">
        <div className="container">
          <SectionHeading
            index="02"
            label="Capabilities"
            id="capabilities-title"
            title={
              <>
                Seven disciplines. <span className="gradient-text">One accountable team.</span>
              </>
            }
            lede="From the first interface sketch to the infrastructure underneath and the support that follows launch."
          />
          <ul role="list" className={classes.bento}>
            {SERVICES.map((service, index) => (
              <Reveal as="li" key={service.slug} delay={(index % 3) * 90} className={classes[BENTO[index]]}>
                <Tilt max={4} className={classes.tile}>
                  <Link href={serviceHref(service)} className={classes.tileLink}>
                    <span className={classes.tileImage}>
                      <Image
                        src={serviceImage(service)}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 40vw, 90vw"
                      />
                    </span>
                    <span className={classes.tileText}>
                      <span className={classes.tileCode}>{service.code}</span>
                      <span className={classes.tileTitle}>{service.title}</span>
                      <span className={classes.tileShort}>{service.short}</span>
                    </span>
                    <span className={classes.tileArrow} aria-hidden="true">
                      <Icon name="arrow-up-right" size={20} />
                    </span>
                  </Link>
                </Tilt>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* D: Challenge to solution */}
      <section id="approach" className={`section surface-soft ${classes.process}`} aria-labelledby="approach-title">
        <div className={`grid-lines ${classes.processGrid}`} aria-hidden="true" />
        <div className="container">
          <SectionHeading
            index="03"
            label="From challenge to solution"
            id="approach-title"
            title={
              <>
                A delivery journey <span className="gradient-text">you can see into.</span>
              </>
            }
            lede="Six stages, each with a clear purpose and a tangible output. Select a stage to see what happens and why it matters."
          />
          <Reveal className={classes.processWrap}>
            <ProcessExplorer />
          </Reveal>
        </div>
      </section>

      {/* E: Technology expertise */}
      <section className="section" aria-labelledby="expertise-title">
        <div className="container">
          <SectionHeading
            index="04"
            label="Technology expertise"
            id="expertise-title"
            title="Engineering disciplines and the tools behind them."
          />
          <ul role="list" className={classes.modules}>
            {EXPERTISE.map((area, index) => (
              <Reveal as="li" key={area.id} delay={(index % 4) * 80}>
                <Tilt className={classes.module}>
                  <span className={`${classes.orb} ${classes[ORB_HUES[index]]}`} aria-hidden="true" />
                  <span className={classes.moduleIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <h3 className={classes.moduleTitle}>{area.title}</h3>
                  <p className={classes.moduleDetail}>{area.detail}</p>
                  <ul role="list" className={classes.tags}>
                    {area.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Tilt>
              </Reveal>
            ))}
            <Reveal as="li" delay={240}>
              <div className={`theme-vivid ${classes.module} ${classes.moduleCta}`}>
                <p>Working with a stack that is not listed here?</p>
                <Button href="/contact" variant="inverse" size="sm">
                  Ask us about it
                </Button>
              </div>
            </Reveal>
          </ul>
        </div>
      </section>

      {/* F: Featured work (capability demonstrations) */}
      <section className="section surface-tint" aria-labelledby="demos-title">
        <div className="container">
          <SectionHeading
            index="05"
            label="Capability demonstrations"
            id="demos-title"
            title="How we approach typical engagements."
            lede="These are illustrative scenarios that show our method. They are not client case studies; detailed project references are available on request."
          />
          <div className={classes.demos}>
            {DEMONSTRATIONS.map((demo, index) => (
              <Reveal as="article" key={demo.id} className={classes.demo} data-flip={index % 2 ? "" : undefined}>
                <div className={classes.demoVisual}>
                  <Image src={DEMO_IMAGES[demo.id]} alt="" fill sizes="(min-width: 1024px) 40vw, 90vw" />
                  <span className={classes.demoBadge}>Illustrative demonstration</span>
                </div>
                <div className={classes.demoCopy}>
                  <p className="label">{demo.label}</p>
                  <h3 className={classes.demoTitle}>{demo.title}</h3>
                  <dl className={classes.demoBody}>
                    <div>
                      <dt>Challenge</dt>
                      <dd>{demo.challenge}</dd>
                    </div>
                    <div>
                      <dt>Approach</dt>
                      <dd>{demo.approach}</dd>
                    </div>
                    <div>
                      <dt>Solution</dt>
                      <dd>{demo.solution}</dd>
                    </div>
                  </dl>
                  <ul role="list" className={classes.tags} aria-label="Engineering considerations">
                    {demo.considerations.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* G: Why Sharav */}
      <section className="section" aria-labelledby="why-title">
        <div className={`container ${classes.why}`}>
          <div className={classes.whyIntro}>
            <SectionHeading index="06" label="Why Sharav" id="why-title" title="What you can expect from working with us." />
            <Reveal className={classes.whyVisual} delay={120}>
              <Image src="/images/3d/brand.webp" alt="" fill sizes="(min-width: 1024px) 35vw, 80vw" />
            </Reveal>
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

      {/* H: Engagement */}
      <section className="section surface-soft" aria-labelledby="engage-title">
        <div className="container">
          <SectionHeading
            index="07"
            label="Getting started"
            id="engage-title"
            title="Four steps from first message to first iteration."
          />
          <ol role="list" className={classes.steps}>
            {ENGAGEMENT.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 110} className={classes.stepItem}>
                <span className={`${classes.orb} ${classes[ORB_HUES[index]]} ${classes.stepOrb}`} aria-hidden="true">
                  {index + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* I: Closing CTA */}
      <CtaBand label="Start a project" title="Have a system to build, fix or modernize?" />
    </>
  );
}

import CtaBand from "../../src/components/layout/CtaBand";
import PageHero from "../../src/components/layout/PageHero";
import Seo from "../../src/components/layout/Seo";
import Reveal from "../../src/components/ui/Reveal";
import SectionHeading from "../../src/components/ui/SectionHeading";
import { CONSULTING } from "../../src/content/company";
import pageClasses from "../../src/styles/Pages.module.css";
import classes from "../../src/styles/Consulting.module.css";

// Aspects are numbered continuously across phases (01–10).
const PHASE_OFFSETS = CONSULTING.phases.map((_, index) =>
  CONSULTING.phases.slice(0, index).reduce((sum, phase) => sum + phase.aspects.length, 0)
);

export default function ITConsultingPage() {
  return (
    <>
      <Seo
        title="IT Consulting"
        path="/it-consulting"
        description="IT consulting from Sharav Infotech: assessment, strategic planning, vendor selection, implementation, project management, security and ongoing support."
      />
      <PageHero
        label="IT Consulting"
        title={CONSULTING.title}
        lede={CONSULTING.lede}
        trail={[{ label: "Services", href: "/services" }]}
      />

      <section className="section" aria-labelledby="consulting-intro">
        <div className={`container ${pageClasses.split}`}>
          <SectionHeading
            label="Our role"
            id="consulting-intro"
            title="Independent guidance, followed through to delivery."
          />
          <Reveal className={pageClasses.prose}>
            <p>{CONSULTING.intro}</p>
          </Reveal>
        </div>
      </section>

      <section className={`section ${pageClasses.raised}`} aria-labelledby="aspects-title">
        <div className="container">
          <SectionHeading
            label="Key aspects"
            id="aspects-title"
            title="Ten areas of consulting work, organized by phase."
          />
          <div className={classes.phases}>
            {CONSULTING.phases.map((phase, phaseIndex) => (
              <Reveal key={phase.id} className={classes.phase} delay={phaseIndex * 80}>
                <div className={classes.phaseHead}>
                  <span className={classes.phaseIndex}>Phase {phaseIndex + 1}</span>
                  <h3>{phase.label}</h3>
                </div>
                <ul role="list" className={classes.aspects}>
                  {phase.aspects.map((aspect, index) => (
                    <li key={aspect.title}>
                      <span className={classes.aspectIndex}>
                        {String(PHASE_OFFSETS[phaseIndex] + index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h4>{aspect.title}</h4>
                        <p>{aspect.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="We can help you decide where technology should take you next." />
    </>
  );
}

ITConsultingPage.layoutProps = { headerTone: "inverse" };

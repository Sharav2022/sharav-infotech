import { SITE } from "../../content/site";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import classes from "../../styles/Pages.module.css";

export default function CtaBand({
  title = "Ready to talk about your project?",
  label = "Next step",
}) {
  return (
    <section className="section theme-inverse">
      <Reveal className={`container ${classes.ctaBand}`}>
        <div>
          <p className="label">{label}</p>
          <h2>{title}</h2>
        </div>
        <div className={classes.ctaActions}>
          <Button href="/contact" variant="inverse" size="lg">
            Discuss your project
          </Button>
          <Button href={`mailto:${SITE.email}`} variant="secondary" size="lg" icon="mail">
            Email us
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

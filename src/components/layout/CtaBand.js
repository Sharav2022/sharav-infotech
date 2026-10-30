import Image from "next/image";
import { SITE } from "../../content/site";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import classes from "./CtaBand.module.css";

export default function CtaBand({
  title = "Ready to talk about your project?",
  label = "Next step",
}) {
  return (
    <section className="section">
      <div className="container">
        <Reveal className={`theme-vivid ${classes.band}`}>
          <div className={classes.copy}>
            <p className="label">{label}</p>
            <h2>{title}</h2>
            <div className={classes.actions}>
              <Button href="/contact" variant="inverse" size="lg">
                Discuss your project
              </Button>
              <Button href={`mailto:${SITE.email}`} variant="secondary" size="lg" icon="mail">
                Email us
              </Button>
            </div>
          </div>
          <div className={classes.visual} aria-hidden="true">
            <Image src="/images/3d/contact.webp" alt="" fill sizes="(min-width: 1024px) 30vw, 70vw" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

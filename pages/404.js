import Link from "next/link";
import Seo from "../src/components/layout/Seo";
import Button from "../src/components/ui/Button";
import { SERVICES, serviceHref } from "../src/content/services";
import classes from "../src/styles/NotFound.module.css";

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" path="/404" noindex />
      <section className={`luminous ${classes.page}`}>
        <div className={`grid-lines ${classes.grid}`} aria-hidden="true" />
        <div className={`container ${classes.inner}`}>
          <p className={classes.code}>
            <span>HTTP</span> 404
          </p>
          <h1 className={classes.title}>
            This route does not <span className="gradient-text">resolve.</span>
          </h1>
          <p className="lede">
            The page may have moved during our site update, or the address may
            be mistyped.
          </p>
          <div className={classes.actions}>
            <Button href="/">Back to home</Button>
            <Button href="/contact" variant="secondary">
              Contact us
            </Button>
          </div>
          <nav aria-label="Services" className={classes.links}>
            <p className="label">Or explore a service</p>
            <ul role="list">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link href={serviceHref(service)}>{service.navTitle}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}

NotFoundPage.layoutProps = { hideFooter: true };

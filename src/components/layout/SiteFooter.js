import Link from "next/link";
import { SITE } from "../../content/site";
import { SERVICES, serviceHref } from "../../content/services";
import Logo from "../brand/Logo";
import Icon from "../ui/Icon";
import classes from "./SiteFooter.module.css";

const COMPANY_LINKS = [
  { label: "About us", href: "/about-us" },
  { label: "Our approach", href: "/#approach" },
  { label: "IT consulting", href: "/it-consulting" },
  { label: "Contact", href: "/contact" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();
  const { address } = SITE;

  return (
    <footer className={`theme-inverse ${classes.footer}`}>
      <div className={`container-wide ${classes.grid}`}>
        <div className={classes.brandCol}>
          <Logo />
          <p className={classes.tagline}>
            Software, cloud and IT consulting for organizations that need
            technology to work, and keep working.
          </p>
          <ul role="list" className={classes.social}>
            {SITE.social.map((profile) => (
              <li key={profile.id}>
                <a href={profile.url} target="_blank" rel="noopener noreferrer">
                  <Icon name={profile.id} size={18} />
                  {profile.label}
                </a>
              </li>
            ))}
            <li>
              <a href={SITE.careersUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="arrow-up-right" size={18} />
                Careers
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Services" className={classes.col}>
          <p className="label">Services</p>
          <ul role="list">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link href={serviceHref(service)}>{service.navTitle}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className={classes.col}>
          <p className="label">Company</p>
          <ul role="list">
            {COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={classes.col}>
          <p className="label">Contact</p>
          <address className={classes.contact}>
            <a href={address.mapUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="map-pin" size={18} />
              <span>
                {address.street}
                <br />
                {address.locality}, {address.region} {address.postalCode}
                <br />
                {address.countryName}
              </span>
            </a>
            <a href={SITE.phone.href}>
              <Icon name="phone" size={18} />
              {SITE.phone.display}
            </a>
            <a href={`mailto:${SITE.email}`}>
              <Icon name="mail" size={18} />
              {SITE.email}
            </a>
          </address>
        </div>
      </div>

      <div className={`container-wide ${classes.base}`}>
        <p>© {year} {SITE.name}. All rights reserved.</p>
        <ul role="list" className={classes.legal}>
          <li>
            <Link href="/privacy">Privacy</Link>
          </li>
          <li>
            <span className={classes.coords}>Mississauga · Ontario · Canada</span>
          </li>
        </ul>
      </div>
    </footer>
  );
}

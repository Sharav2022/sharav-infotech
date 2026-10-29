import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useId, useRef, useState } from "react";
import { CONTACT_CTA, NAVIGATION } from "../../content/site";
import { SERVICE_GROUPS, SERVICES, serviceHref } from "../../content/services";
import Logo from "../brand/Logo";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import classes from "./SiteHeader.module.css";

const isCurrent = (pathname, href) =>
  href !== "/" && !href.includes("#") && pathname.startsWith(href);

export default function SiteHeader({ tone = "default" }) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef(null);
  const hoverTimer = useRef();
  const panelId = useId();
  const mobileId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus whenever navigation starts.
  useEffect(() => {
    const close = () => {
      setMenuOpen(false);
      setServicesOpen(false);
    };
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  useEffect(() => {
    if (!servicesOpen && !menuOpen) return;
    const onKey = (event) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMenuOpen(false);
      }
    };
    const onPointer = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [servicesOpen, menuOpen]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const hoverOpen = (open) => (event) => {
    if (event.pointerType !== "mouse") return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setServicesOpen(open), open ? 60 : 180);
  };

  const transparent = tone === "inverse" && !scrolled && !menuOpen;

  return (
    <header
      className={`${classes.header} ${transparent ? "theme-inverse " + classes.transparent : classes.solid}`}
      data-scrolled={scrolled || undefined}
    >
      <div className={`container-wide ${classes.bar}`}>
        <Link href="/" className={classes.brand} aria-label="Sharav Infotech, home">
          <Logo />
        </Link>

        <nav className={classes.nav} aria-label="Primary">
          <ul role="list" className={classes.navList}>
            {NAVIGATION.map((item) =>
              item.hasMenu ? (
                <li
                  key={item.id}
                  ref={servicesRef}
                  className={classes.hasMenu}
                  onPointerEnter={hoverOpen(true)}
                  onPointerLeave={hoverOpen(false)}
                >
                  <button
                    type="button"
                    className={classes.navLink}
                    aria-expanded={servicesOpen}
                    aria-controls={panelId}
                    data-current={isCurrent(router.pathname, item.href) || undefined}
                    onClick={() => setServicesOpen((open) => !open)}
                  >
                    {item.label}
                    <Icon name="chevron-down" size={16} className={classes.chevron} />
                  </button>
                  <div id={panelId} className={`theme-inverse ${classes.panel}`} hidden={!servicesOpen}>
                    <div className={classes.panelGroups}>
                      {SERVICE_GROUPS.map((group) => (
                        <div key={group.id}>
                          <p className="label">{group.label}</p>
                          <ul role="list" className={classes.panelList}>
                            {SERVICES.filter((s) => s.group === group.id).map((service) => (
                              <li key={service.slug}>
                                <Link href={serviceHref(service)} className={classes.panelLink}>
                                  <span className={classes.panelCode}>{service.code}</span>
                                  <span>
                                    <span className={classes.panelTitle}>{service.navTitle}</span>
                                    <span className={classes.panelShort}>{service.short}</span>
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className={classes.panelFoot}>
                      <Link href="/services" className={classes.panelAll}>
                        View all services <Icon name="arrow-right" size={16} />
                      </Link>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={classes.navLink}
                    aria-current={isCurrent(router.pathname, item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className={classes.actions}>
          <Button href={CONTACT_CTA.href} size="sm" className={classes.cta}>
            {CONTACT_CTA.label}
          </Button>
          <button
            type="button"
            className={classes.menuButton}
            aria-expanded={menuOpen}
            aria-controls={mobileId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={22} />
            <span className="visually-hidden">{menuOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <div id={mobileId} className={`theme-inverse ${classes.mobile}`} hidden={!menuOpen}>
        <nav aria-label="Mobile" className="container-wide">
          <p className="label">Services</p>
          <ul role="list" className={classes.mobileServices}>
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link href={serviceHref(service)}>
                  <span className={classes.panelCode}>{service.code}</span>
                  {service.navTitle}
                </Link>
              </li>
            ))}
          </ul>
          <ul role="list" className={classes.mobilePrimary}>
            <li><Link href="/services">All services</Link></li>
            {NAVIGATION.filter((item) => !item.hasMenu).map((item) => (
              <li key={item.id}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li><Link href="/contact">Contact</Link></li>
          </ul>
          <Button href={CONTACT_CTA.href} variant="inverse" size="lg" className={classes.mobileCta}>
            {CONTACT_CTA.label}
          </Button>
        </nav>
      </div>
    </header>
  );
}

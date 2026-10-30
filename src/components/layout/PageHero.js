import Image from "next/image";
import Link from "next/link";
import classes from "./PageHero.module.css";

// Luminous opening band for interior pages, optionally with a 3D render.
// `trail` is a breadcrumb list of { label, href }; the current page is appended.
export default function PageHero({ label, title, lede, trail = [], image, children }) {
  return (
    <section className={`luminous ${classes.hero}`} data-has-image={image ? "" : undefined}>
      <div className={`grid-lines ${classes.grid}`} aria-hidden="true" />
      <div className={`container ${classes.inner}`}>
        <div className={classes.copy}>
          <nav aria-label="Breadcrumb">
            <ol role="list" className={classes.trail}>
              <li>
                <Link href="/">Home</Link>
              </li>
              {trail.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
              <li aria-current="page">{label}</li>
            </ol>
          </nav>
          <h1 className={classes.title}>{title}</h1>
          {lede && <p className={`lede ${classes.lede}`}>{lede}</p>}
          {children}
        </div>
        {image && (
          <div className={classes.visual}>
            <Image src={image} alt="" fill priority sizes="(min-width: 1024px) 40vw, 90vw" />
          </div>
        )}
      </div>
    </section>
  );
}

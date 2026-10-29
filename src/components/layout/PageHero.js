import Link from "next/link";
import classes from "./PageHero.module.css";

// Dark opening band for interior pages. `trail` is a breadcrumb list of
// { label, href } objects; the current page is appended automatically.
export default function PageHero({ label, title, lede, trail = [], children }) {
  return (
    <section className={`theme-inverse ${classes.hero}`}>
      <div className={`blueprint-grid ${classes.grid}`} aria-hidden="true" />
      <div className={`container ${classes.inner}`}>
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
    </section>
  );
}

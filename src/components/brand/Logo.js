import classes from "./Logo.module.css";

// Concept A, "Precision Geometry": two identical modules rotated 180° form the
// S, separated by a diagonal slit of negative space. Drawn on a 48-unit grid
// with an 8-unit stroke so it survives at favicon size.
export const MARK_UPPER = "M40 6V14H16V20H26L18 28H8V16A10 10 0 0 1 18 6Z";
export const MARK_LOWER = "M8 42V34H32V28H22L30 20H40V32A10 10 0 0 1 30 42Z";

export function LogoMark({ className, title }) {
  return (
    <svg
      className={`${classes.mark} ${className ?? ""}`}
      viewBox="0 0 48 48"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path className={classes.upper} d={MARK_UPPER} />
      <path className={classes.lower} d={MARK_LOWER} />
    </svg>
  );
}

export default function Logo({ compact = false, className }) {
  return (
    <span className={`${classes.logo} ${className ?? ""}`}>
      <LogoMark />
      {!compact && (
        <span className={classes.wordmark}>
          Sharav<span className={classes.secondary}>Infotech</span>
        </span>
      )}
    </span>
  );
}

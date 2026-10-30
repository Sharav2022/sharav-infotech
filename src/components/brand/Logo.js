import { useId } from "react";
import classes from "./Logo.module.css";

// Concept A, "Precision Geometry": two identical modules rotated 180° form the
// S, separated by a diagonal slit of negative space. Drawn on a 48-unit grid
// with an 8-unit stroke so it survives at favicon size. Each module carries
// its own gradient (cyan→royal, violet→royal), matching the 3D brand render.
export const MARK_UPPER = "M40 6V14H16V20H26L18 28H8V16A10 10 0 0 1 18 6Z";
export const MARK_LOWER = "M8 42V34H32V28H22L30 20H40V32A10 10 0 0 1 30 42Z";

export function LogoMark({ className, title, tone = "color" }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const solid = tone === "white" ? "#ffffff" : null;

  return (
    <svg
      className={`${classes.mark} ${className ?? ""}`}
      viewBox="0 0 48 48"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {!solid && (
        <defs>
          <linearGradient id={`${id}u`} x1="8" y1="6" x2="40" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#00c8e8" />
            <stop offset="1" stopColor="#3457ff" />
          </linearGradient>
          <linearGradient id={`${id}l`} x1="40" y1="42" x2="8" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#8056f7" />
            <stop offset="1" stopColor="#3457ff" />
          </linearGradient>
        </defs>
      )}
      <path d={MARK_UPPER} fill={solid ?? `url(#${id}u)`} />
      <path d={MARK_LOWER} fill={solid ?? `url(#${id}l)`} />
    </svg>
  );
}

export default function Logo({ compact = false, tone = "color", className }) {
  return (
    <span className={`${classes.logo} ${classes[tone]} ${className ?? ""}`}>
      <LogoMark tone={tone} />
      {!compact && (
        <span className={classes.wordmark}>
          Sharav<span className={classes.secondary}>Infotech</span>
        </span>
      )}
    </span>
  );
}

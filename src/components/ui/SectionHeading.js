import Reveal from "./Reveal";
import classes from "./SectionHeading.module.css";

// Standard section opener: an indexed mono label, a display heading and an
// optional lede. `index` renders as the "§ 02" style annotation.
export default function SectionHeading({
  index,
  label,
  title,
  lede,
  as: Heading = "h2",
  align = "start",
  id,
  children,
}) {
  return (
    <Reveal className={`${classes.heading} ${classes[align]}`}>
      {(index || label) && (
        <p className="label">
          {index && <span className={classes.index}>{index}</span>}
          {label}
        </p>
      )}
      <Heading id={id} className={classes.title}>
        {title}
      </Heading>
      {lede && <p className={`lede ${classes.lede}`}>{lede}</p>}
      {children}
    </Reveal>
  );
}

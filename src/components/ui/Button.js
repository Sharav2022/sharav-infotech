import Link from "next/link";
import Icon from "./Icon";
import classes from "./Button.module.css";

// One component for every call to action. Renders a Next <Link> for internal
// routes, <a> for external/mail/tel links and <button> otherwise.
export default function Button({
  href,
  variant = "primary",
  size = "md",
  icon = "arrow-right",
  external = false,
  className,
  children,
  ...rest
}) {
  const classNames = [classes.button, classes[variant], classes[size], className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span>{children}</span>
      {icon && <Icon name={icon} size={18} className={classes.icon} />}
    </>
  );

  if (!href) {
    return (
      <button className={classNames} {...rest}>
        {content}
      </button>
    );
  }

  if (external || /^(https?:|mailto:|tel:)/.test(href)) {
    const opensNewTab = external || href.startsWith("http");
    return (
      <a
        className={classNames}
        href={href}
        {...(opensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <Link className={classNames} href={href} {...rest}>
      {content}
    </Link>
  );
}

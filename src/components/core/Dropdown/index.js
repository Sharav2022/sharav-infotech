import { useRouter } from "next/router";
import classes from "./dropdown.module.css";
import Link from "next/link";

const Dropdown = ({ items }) => {
  const router = useRouter();

  const { asPath } = router;
  return (
    <div className={classes.container} id="dropdown">
      {items.map((item) => (
        <Link key={item.id} passHref href={"/" + item.url} legacyBehavior>
          <a
            className={classes.item}
            data-active={asPath === "/" + item.url ? "true" : undefined}
          >
            {item.title}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Dropdown;

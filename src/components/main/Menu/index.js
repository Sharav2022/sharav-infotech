import classes from "./menu.module.css";
import CrossIcon from "../../../assets/icons/cross.svg";
import { HeaderItems } from "../../../globals/mock";
import Link from "next/link";
import { useRouter } from "next/router";

const Menu = ({ closeHandler }) => {
  const router = useRouter();

  const { asPath } = router;

  return (
    <>
      <div className={classes.menu}>
        <div className={classes.tc}>
          <div className={classes.menu_text}>Menu</div>
          <div className={classes.cross_icon} onClick={closeHandler}>
            <CrossIcon />
          </div>
        </div>
        <div className={classes.bottom_container}>
          {HeaderItems.map((item) => (
            <>
              <Link key={item.id} passHref href={"/" + item.url} legacyBehavior>
                <a
                  className={classes.item}
                  data-active={asPath === "/" + item.url ? "true" : undefined}
                  onClick={closeHandler}
                >
                  {item.title}
                </a>
              </Link>
              {item.child && (
                <div className={classes.children}>
                  {item.child.map((childItem) => (
                    <Link
                      key={childItem.id}
                      passHref
                      href={"/" + childItem.url}
                      legacyBehavior
                    >
                      <a
                        className={classes.child_item}
                        data-active={
                          asPath === "/" + childItem.url ? "true" : undefined
                        }
                        onClick={closeHandler}
                      >
                        {childItem.title}
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </>
          ))}
        </div>
      </div>
      <div className="offcanvas-backdrop"></div>
    </>
  );
};

export default Menu;

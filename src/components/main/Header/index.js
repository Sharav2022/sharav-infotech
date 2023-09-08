import { HeaderItems } from "@/globals/mock";
import classes from "./header.module.css";
import LogoIcon from "@/assets/icons/logo.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import MenuIcon from "@/assets/icons/menu.svg";
import { useEffect, useState } from "react";
import Menu from "../Menu";
import useIsMobile from "@/components/hooks/useIsMobile";
import LogoGif from "@/assets/images/sil.gif";
import SharavLogo from "@/assets/icons/SharavInfotechLogo.jpeg";
import Image from "next/image";
import Dropdown from "@/components/core/Dropdown";

const Header = (props) => {
  const router = useRouter();

  const { asPath } = router;

  const [showMenu, setShowMenu] = useState(false);

  const isMobile = useIsMobile({ breakpoint: 992 });

  useEffect(() => {
    if (!isMobile) {
      setShowMenu(false);
    }
  }, [isMobile]);

  const goToHome = () => {
    router.push("/");
  };

  const [hoverIndex, setHoverIndex] = useState();

  return (
    <header className={classes.header}>
      <div className={"container " + classes.container}>
        <div className={classes.logo_container} onClick={goToHome}>
          <div className={classes.logo}>
            <LogoIcon />
          </div>
          <span>SharavInfotech</span>
          {/* <Image src={LogoGif} fill={true} /> */}
        </div>
        <div className={classes.right_container}>
          {HeaderItems.map((item, index) => (
            <div
              className={classes.wrapper}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex()}
            >
              <Link key={item.id} passHref href={"/" + item.url} legacyBehavior>
                <a
                  className={classes.item}
                  data-active={asPath === "/" + item.url ? "true" : undefined}
                >
                  {item.title}
                </a>
              </Link>
              {item.child && index === hoverIndex && (
                <Dropdown items={item.child} />
              )}
            </div>
          ))}
        </div>
        <div className={classes.menu} onClick={() => setShowMenu(true)}>
          <MenuIcon />
        </div>
      </div>
      {isMobile && showMenu && <Menu closeHandler={() => setShowMenu(false)} />}
    </header>
  );
};

export default Header;

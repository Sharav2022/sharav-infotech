import {
  COPYRIGHT,
  FooterDescription,
  HeaderItems,
  OFFICIAL_MAIL,
  SocialLinks,
} from "../../../globals/mock";
import classes from "./footer.module.css";
import LogoIcon from "../../../assets/icons/logo.svg";
import DownIcon from "../../../assets/icons/chevron-down.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useIsMobile from "../../hooks/useIsMobile";
const Footer = (props) => {
  const router = useRouter();

  const { asPath } = router;

  const [showUsefulLinks, setShowUsefulLinks] = useState(false);
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [showServicesLink, setShowServicesLink] = useState(false);
  const isTablet = useIsMobile({ breakpoint: 992 });

  useEffect(() => {
    if (isTablet) {
      setShowSocialLinks(false);
      setShowUsefulLinks(false);
      setShowServicesLink(false);
    } else {
      setShowSocialLinks(true);
      setShowUsefulLinks(true);
      setShowServicesLink(true);
    }
  }, [isTablet]);

  return (
    <footer className={classes.footer}>
      <div className={"container " + classes.container}>
        <div className={classes.footer_c}>
          <div className={classes.lc}>
            <div className={classes.logo_container}>
              <div className={classes.logo}>
                <LogoIcon />
              </div>
              <span>SharavInfotech</span>
            </div>
            <div className={classes.description}>{FooterDescription}</div>
          </div>
          <div className={classes.rc}>
            <div className={classes.useful_links}>
              <div className={classes.txt}>
                <span>Useful Links</span>
                <div
                  style={{
                    transform: showUsefulLinks ? "rotate(180deg)" : undefined,
                    cursor: "pointer",
                  }}
                  onClick={() => setShowUsefulLinks((prev) => !prev)}
                >
                  {isTablet && <DownIcon />}
                </div>
              </div>
              {showUsefulLinks && (
                <div className={classes.items}>
                  {HeaderItems.map((item) => (
                    <>
                      <Link
                        key={item.id}
                        passHref
                        href={"/" + item.url}
                        legacyBehavior
                      >
                        <a
                          className={classes.item}
                          data-active={
                            asPath === "/" + item.url ? "true" : undefined
                          }
                        >
                          {item.title}
                          {item.child && (
                            <div
                              style={{
                                transform: showServicesLink
                                  ? "rotate(180deg)"
                                  : undefined,
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                setShowServicesLink((prev) => !prev)
                              }
                            >
                              {isTablet && <DownIcon />}
                            </div>
                          )}
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
                                className={classes.item}
                                data-active={
                                  asPath === "/" + childItem.url
                                    ? "true"
                                    : undefined
                                }
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
              )}
            </div>
            <div className={classes.social_links}>
              <div className={classes.txt}>
                <span>Social Links</span>
                <div
                  style={{
                    transform: showSocialLinks ? "rotate(180deg)" : undefined,
                    cursor: "pointer",
                  }}
                  onClick={() => setShowSocialLinks((prev) => !prev)}
                >
                  {isTablet && <DownIcon />}
                </div>
              </div>
              {showSocialLinks && (
                <div className={classes.items}>
                  {SocialLinks.map((item) => (
                    <a
                      key={item.id}
                      className={classes.item}
                      href={item.url}
                      target="_blank"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className={classes.contact_us}>
              <div className={classes.txt}>
                <div>Contact Us</div>
              </div>
              <a href={`mailto:${OFFICIAL_MAIL}`} className={classes.mail}>
                {OFFICIAL_MAIL}
              </a>
            </div>
          </div>
        </div>
        <div className={classes.copyright}>{COPYRIGHT}</div>
      </div>
    </footer>
  );
};

export default Footer;

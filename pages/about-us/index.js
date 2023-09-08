import {
  ABOUT_US_TITLE,
  ABOUT_US_WHO_WE_ARE,
  HOW_WE_ARE,
  JOB_OPENING,
  TEAM,
  TESTIMONIALS,
} from "../../src/globals/mock";
import classes from "./about-us.module.css";
import Animate from "../../src/components/core/Animate";
import Head from "next/head";
import ClutchLogo from "../../src/assets/icons/clutch_logo.svg";
import FullStarIcon from "../../src/assets/icons/fullstar.svg";
import QuoteIcon from "../../src/assets/icons/quote.svg";
import LeftArrowIcon from "../../src/assets/icons/left-arrow-white-lg.svg";
import RightArrowIcon from "../../src/assets/icons/right-arrow-white-lg.svg";
import { useState } from "react";
import ServiceCard from "../../src/components/core/ServiceCard";
import TeamMemberCard from "../../src/components/core/TeamMemberCard";
const AboutUsPage = () => {
  const [activeTestimony, setActiveTestimony] = useState(0);

  const testimonyHandler = (position) => {
    if (position === "next") {
      setActiveTestimony((currentState) => {
        if (currentState === TESTIMONIALS.length - 1) {
          return 0;
        } else {
          return currentState + 1;
        }
      });
    } else if (position === "prev") {
      setActiveTestimony((currentState) => {
        if (currentState === 0) {
          return TESTIMONIALS.length - 1;
        } else {
          return currentState - 1;
        }
      });
    }
  };

  const [leftLovered, setLeftHovered] = useState();
  const [rightLovered, setRightHovered] = useState();

  return (
    <>
      <Head>
        <title>SharavInfotech - Emerging Leader of IT Services</title>
        <meta
          name="description"
          content="SharavInfotech offers fully managed IT Services to low end business."
        />
        <link rel="icon" href={`icons/logo.svg`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={classes.container}>
        <Animate>
          <div className={classes.bg_img}>
            <span className={classes.gradient}></span>
          </div>
        </Animate>
        <Animate>
          <div className={"container"}>
            <h1 className={classes.title}>{ABOUT_US_TITLE}</h1>
            <div className={classes.who_we_are}>
              <p className={classes.wwa_l}>{ABOUT_US_WHO_WE_ARE[0]}</p>
              <p className={classes.wwa_r}>{ABOUT_US_WHO_WE_ARE[1]}</p>
            </div>
          </div>
        </Animate>
        <Animate>
          <div className={"container"}>
            <h1 className={classes.title}>{"How we work"}</h1>
            <div className={classes.how_we_work}>
              {HOW_WE_ARE.map((item, index) => (
                <div className={classes.hwa_item}>
                  <div className={classes.hwa_sr}>
                    <span>0</span>
                    <span>{item.id}</span>
                  </div>
                  <div className={classes.hwa_title}>{item.title}</div>
                  <div className={classes.hwa_desc}>{item.description}</div>
                </div>
              ))}
            </div>
          </div>
        </Animate>
        <Animate>
          <div className={"container"}>
            <div className={classes.testimonial_container}>
              <div className={classes.clutch_o_card}>
                <h3 className={classes.tc_count}>40+</h3>
                <h2 className={classes.tc_served}>Clients Already Served</h2>
                <div className={classes.clutch_c}>
                  <div className={classes.cc_l}>
                    <div>Reviewed on</div>
                    <ClutchLogo />
                  </div>
                  <div className={classes.cc_r}>
                    <div className={classes.stars}>
                      {[...Array(5).keys()].map((_) => (
                        <FullStarIcon />
                      ))}
                    </div>
                    <div>20 reviews</div>
                  </div>
                </div>
              </div>
              <div className={classes.testimonial_card}>
                <div className={classes.tc_c}>
                  <div className={classes.quote_icon}>
                    <QuoteIcon />
                  </div>
                  <div className={classes.nav_icons}>
                    <div
                      onClick={() => testimonyHandler("prev")}
                      onMouseOver={() => setLeftHovered(true)}
                      onMouseLeave={() => setLeftHovered(false)}
                      className={leftLovered ? classes.stroke_white : undefined}
                    >
                      <LeftArrowIcon />
                    </div>
                    <div
                      onClick={() => testimonyHandler("next")}
                      onMouseOver={() => setRightHovered(true)}
                      onMouseLeave={() => setRightHovered(false)}
                      className={
                        rightLovered ? classes.stroke_white : undefined
                      }
                    >
                      <RightArrowIcon />
                    </div>
                  </div>
                </div>
                <div className={classes.testimony}>
                  <div>{TESTIMONIALS[activeTestimony].testimony}</div>
                  <h5>{TESTIMONIALS[activeTestimony].name}</h5>
                </div>
              </div>
            </div>
          </div>
        </Animate>
        <Animate animation="fade-left">
          <div className={"container " + classes.team_section}>
            <h1 className={classes.team_title}>{"Our Talented Team"}</h1>
            <div className={classes.team_members}>
              {TEAM.map((team) => (
                <TeamMemberCard key={team.id} {...team} />
              ))}
            </div>
          </div>
        </Animate>
        <Animate>
          <div className={"container " + classes.job_opening_section}>
            <ServiceCard
              {...JOB_OPENING}
              imageBgClass={classes.job_opening_bg}
            />
          </div>
        </Animate>
      </div>
    </>
  );
};

export default AboutUsPage;

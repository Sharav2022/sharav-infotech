import classes from "./main-carousel-section.module.css";
import { CarouselItems, SocialLinks } from "@/globals/mock";
import Carousel from "@/components/core/Carousel";

const MainCarouselSection = (props) => {
  const socialLinkHandler = (url) => {
    window.open(url, "blank");
  };
  return (
    <Carousel
      components={CarouselItems.map((item) => (
        <div key={item.id} className={classes.item}>
          <div className={classes.bg_img}></div>
          <span className={classes.gradient}></span>
          <div className={classes.title}>{item.title}</div>
          <div className={classes.description}>{item.description}</div>
          <div className={classes.social_links}>
            {SocialLinks.map((_) => (
              <div
                className={classes.icon + ` icon-${_.selector}`}
                onClick={() => socialLinkHandler(_.url)}
              >
                {_.icon}
              </div>
            ))}
          </div>
        </div>
      ))}
    />
  );
};

export default MainCarouselSection;

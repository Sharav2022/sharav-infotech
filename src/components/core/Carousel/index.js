import classes from "./carousel.module.css";
import Slider from "react-slick";
import LeftArrowIcon from "../../../assets/icons/left-arrow-white-lg.svg";
import RightArrowIcon from "../../../assets/icons/right-arrow-white-lg.svg";
import useIsMobile from "../../hooks/useIsMobile";

const Carousel = ({ components = [] }) => {
  const isMobile = useIsMobile({ breakpoint: 768 });

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    fade: true,
    slidesToScroll: 1,
    className: classes.carousel_item,
    autoplay: true,
    arrows: isMobile ? false : true,
    nextArrow: <RightArrowIcon />,
    prevArrow: <LeftArrowIcon />,
  };

  return (
    <section className={classes.carousel}>
      <Slider {...settings}>{components}</Slider>
    </section>
  );
};

export default Carousel;

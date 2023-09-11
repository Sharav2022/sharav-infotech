import dynamic from "next/dynamic";

const ServicesSection = dynamic(() => import("./components/ServicesSection"));
const MainCarouselSection = dynamic(() =>
  import("./components/MainCarouselSection")
);
const WhyusSection = dynamic(() => import("./components/WhyusSection"));

export { ServicesSection, WhyusSection, MainCarouselSection };

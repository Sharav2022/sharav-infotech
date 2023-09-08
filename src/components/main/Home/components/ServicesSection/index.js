import classes from "./services-section.module.css";
import { Services } from "../../../../../globals/mock";
import ServiceCard from "../../../../core/ServiceCard";

const ServicesSection = (props) => {
  return (
    <section className={"container " + classes.service_section}>
      <h2 className={classes.service_headline}>Our Services</h2>
      <div className={classes.services}>
        {Services.slice(0, 3).map((service) => (
          <ServiceCard {...service} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;

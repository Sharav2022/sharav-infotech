import { Services } from "../../src/globals/mock";
import classes from "./services.module.css";
import ServiceCard from "../../src/components/core/ServiceCard";
import CircleBGIcon from "../../src/assets/icons/circle-bg.svg";
import Animate from "../../src/components/core/Animate";
import Head from "next/head";
const ServicesPage = () => {
  return (
    <>
      <Head>
        <title>SharavInfotech - Emerging Leader of IT Services</title>
        <meta
          name="description"
          content="SharavInfotech offers fully managed IT Services to low end business."
        />
        <link rel="icon" href={`icons/logo.svg`} />
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section className={"container " + classes.service_section}>
        <h2 className={classes.service_headline}>Services</h2>
        <Animate>
          <div className={classes.services}>
            {Services.map((service) => (
              <ServiceCard {...service} />
            ))}
          </div>
        </Animate>
        <div className={classes.bg}>
          <CircleBGIcon />
        </div>
      </section>
    </>
  );
};

export default ServicesPage;

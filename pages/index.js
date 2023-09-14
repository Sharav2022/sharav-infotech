import Head from "next/head";
import classes from "../src/styles/Home.module.css";
import {
  MainCarouselSection,
  ServicesSection,
  WhyusSection,
} from "../src/components/main/Home";
import Animate from "../src/components/core/Animate";

export default function Home() {
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
      <div>
        {/* Carousel */}
        <div className={classes.container}>
          <Animate>
            <MainCarouselSection />
          </Animate>
          <ServicesSection />
          <Animate>
            <WhyusSection />
          </Animate>
        </div>
      </div>
    </>
  );
}

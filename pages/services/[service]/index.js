import ServiceCard from "../../../src/components/core/ServiceCard";
import classes from "./service.module.css";
import { Services } from "../../../src/globals/mock";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Animate from "../../../src/components/core/Animate";

const Service = (props) => {
  const router = useRouter();

  const { query } = router;

  const [service, setService] = useState();

  useEffect(() => {
    if (query && query.service) {
      setService(Services.find((_) => _.id == query.service));
    } else {
      router.replace("/services");
    }
  }, [router]);

  console.log("service", service);

  return (
    service && (
      <div className={classes.container}>
        <Animate>
          <div className={classes.bg}>
            <div className={"container " + classes.tc}>
              <h1 className={classes.title}>{service.title}</h1>
              <div className={classes.description}>
                {service.mainDescription}
              </div>
            </div>
          </div>
        </Animate>
        <div className={"container " + classes.wwo}>
          <h1 className={classes.wwo_title}>What we offer</h1>
          <ServiceCard {...service} detailed={true} />
        </div>
        {service.solutions && (
          <Animate animation="fade-left">
            <div className={"container " + classes.our_solution}>
              <h1 className={classes.os_title}>Our Solutions</h1>
              <ul className={classes.solutions}>
                {service.solutions.map((sol) => (
                  <li>{sol}</li>
                ))}
              </ul>
            </div>
          </Animate>
        )}
      </div>
    )
  );
};

export default Service;

import classes from "./service-card.module.css";
import {
  Designs,
  JOB_OPENING,
  TestingResults,
  langs,
} from "../../../globals/mock";
import Animate from "../Animate";

const ServiceCard = ({
  title,
  mainDescription,
  description,
  mediaUrl,
  type,
  imageBgClass,
  detailed = false,
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.image_container}>
        <Animate animation="fade-left">
          <div className={classes.img_bg + " " + imageBgClass}>
            <img src={mediaUrl} fill={true} />
          </div>
        </Animate>
      </div>
      <div className={classes.text_container}>
        <Animate animation={"fade-right"}>
          {!detailed && <h3 className={classes.title}>{title}</h3>}
          <div className={classes.description}>
            {detailed ? description : mainDescription}
          </div>
          <div className={classes.component}>
            {fetchServiceTypeComponent(type)}
          </div>
        </Animate>
      </div>
    </div>
  );
};

const fetchServiceTypeComponent = (type) => {
  const clickHandler = () => {
    window.open(JOB_OPENING.url, "blank");
  };

  if (type === "design") {
    return (
      <div className={classes.designs}>
        {Designs.map((design) => (
          <div className={classes.design}>{design}</div>
        ))}
      </div>
    );
  } else if (type === "development") {
    return (
      <div className={classes.langs}>
        {langs.map(({ mediaUrl, width }) => (
          <div className={classes.lang}>
            <img src={mediaUrl} width={width} />
          </div>
        ))}
      </div>
    );
  } else if (type === "testing") {
    return (
      <div className={classes.testing}>
        {TestingResults.map(({ title, subtitle }) => (
          <div className={classes.result}>
            <div>{title}</div>
            <div>{subtitle}</div>
          </div>
        ))}
      </div>
    );
  } else if (type === "button") {
    return (
      <div className={classes.btn} onClick={clickHandler}>
        See Current Job Openings
      </div>
    );
  }
};

export default ServiceCard;

import classes from "./why-us-card.module.css";

const WhyusCard = ({ title, description, icon }) => {
  return (
    <div className={classes.card}>
      <h2 className={classes.title}>{title}</h2>
      <div className={classes.description}>{description}</div>
      <div className={classes.icon}>{icon}</div>
    </div>
  );
};

export default WhyusCard;

import classes from "./loader.module.css";

const Loader = ({ loading = false }) => {
  return (
    <div className={classes.page_loading + " " + loading ? classes.active : ""}>
      <div className={classes.page_loading_inner}>
        <div className={classes.page_spinner}></div>
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Loader;

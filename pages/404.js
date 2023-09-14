import classes from "../src/styles/error.module.css";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import ErrorImageJson from "../src/assets/lottie/error.json";
import HomeIcon from "../src/assets/icons/home.svg";
import { COPYRIGHT } from "../src/globals/mock";
import { useRouter } from "next/router";
const ErrorPage = (props) => {
  const router = useRouter();

  const homeHandler = () => {
    router.replace("/");
  };

  return (
    <section className={classes.bg}>
      <div className={classes.container}>
        <div className={classes.image}>
          <Player autoplay loop src={ErrorImageJson}>
            <Controls
              visible={false}
              buttons={["play", "repeat", "frame", "debug"]}
            />
          </Player>
        </div>
        <div className={classes.txt_container}>
          <h1 className={classes.title}>Error 404</h1>
          <div className={classes.description}>
            The page you are looking for was moved, removed or might never
            existed.
          </div>
          <div className={classes.btn} onClick={homeHandler}>
            <HomeIcon />
            <div>Go to home page</div>
          </div>
        </div>
      </div>
      <div className={classes.copyright}>{COPYRIGHT}</div>
    </section>
  );
};

ErrorPage.getLayoutProps = () => {
  return {
    hideFooter: true,
  };
};

export default ErrorPage;

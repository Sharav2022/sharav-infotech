import Head from "next/head";
import Animate from "../../src/components/core/Animate";
import {
  IT_CONSULTING_ASPECTS,
  IT_CONSULTING_ASPECTS_DESCRIPTION,
  IT_CONSULTING_HEADING,
  IT_CONSULTING_TITLE,
} from "../../src/globals/mock";
import classes from "./it-consulting.module.css";
import { useRouter } from "next/router";
const ITConsultingPage = () => {
  const router = useRouter();

  const navigateToContactUs = () => {
    console.log('called')
    router.push("support");
  };

  return (
    <>
      <Head>
        <title>SharavInfotech - {IT_CONSULTING_TITLE}</title>
        <meta
          name="description"
          content="SharavInfotech offers fully managed IT Services to low end business."
        />
        <link rel="icon" href={`icons/logo.svg`} />
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={classes.container}>
        <Animate>
          <div className={classes.bg}>
            <div className={"container " + classes.tc}>
              <h1 className={classes.title}>{IT_CONSULTING_TITLE}</h1>
              <div className={classes.description}>{IT_CONSULTING_HEADING}</div>
            </div>
          </div>
        </Animate>
        <div className={"container"}>
          <h1 className={classes.aspects_title}>{"Our Key Aspects"}</h1>
          <div className={classes.aspects_description}>
            {IT_CONSULTING_ASPECTS_DESCRIPTION}
          </div>
          <div className={classes.how_we_work}>
            {IT_CONSULTING_ASPECTS.map((item, index) => (
              <Animate>
                <div className={classes.hwa_item}>
                  <div className={classes.hwa_sr}>
                    <span>0</span>
                    <span>{item.id}</span>
                  </div>
                  <div className={classes.hwa_title}>{item.title}</div>
                  <div className={classes.hwa_desc}>{item.description}</div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
        <div className={classes.bg_img}>
          <div className={classes.contact_us_c}>
            <div className={classes.description}>
              We can help you grow where you want. Let’s talk about how digital
              can work for your business.
            </div>
            <div className={classes.btn} onClick={navigateToContactUs}>
              Contact us
            </div>
          </div>
          <span className={classes.gradient}></span>
        </div>
      </div>
    </>
  );
};

export default ITConsultingPage;

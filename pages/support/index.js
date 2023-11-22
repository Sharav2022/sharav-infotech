import classes from "./support.module.css";
import BlackBg from "../../src/assets/icons/black-bg.svg";
import {
  OFFICIAL_MAIL,
  SUPPORT_GET_IN_TOUCH_DESC,
  SUPPORT_GET_IN_TOUCH_TITLE,
  SocialLinks,
} from "../../src/globals/mock";
import PhoneIcon from "../../src/assets/icons/phone-outgoing.svg";
import MailIcon from "../../src/assets/icons/mail.svg";
import TextField from "../../src/components/core/TextField";
import { useEffect, useState } from "react";
import { isEnabled } from "../../src/lib/common";
import axios from "axios";
import Animate from "../../src/components/core/Animate";
import Head from "next/head";

const initialState = {
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  message: undefined,
  phone: undefined,
};

const SupportPage = () => {
  const [formData, setFormData] = useState({ ...initialState });
  const [isSending, setIsSending] = useState(false);

  const changeHandler = (event) => {
    setIsError({ error: false, message: undefined });
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const saveHandler = async () => {
    if (isEnabled || !isSending) {
      setIsSending(true);
      const res = await axios.post(
        "api/send-mail",
        {
          ...formData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );
      setIsSending(false);
      if (res) {
        setIsSuccess(true);
      } else {
        setIsError({
          error: true,
          message: "Something went wrong, please try again.",
        });
      }
    }
  };

  const [isError, setIsError] = useState({
    error: false,
    message: undefined,
  });

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setFormData({ ...initialState });
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }
  }, [isSuccess]);

  const enabled = isEnabled({
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
  });

  const socialLinkHandler = (url) => {
    window.open(url, "blank");
  };

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
      <div className={classes.container}>
        <Animate>
          <section className={classes.get_in_touch}>
            <div className={classes.git_txt}>
              <h1 className={classes.git_title}>
                {SUPPORT_GET_IN_TOUCH_TITLE}
              </h1>
              <div className={classes.git_desc}>
                {SUPPORT_GET_IN_TOUCH_DESC}
              </div>
              <div className={classes.social_links}>
                {SocialLinks.map((_) => (
                  <div
                    className={classes.icon + ` icon-${_.selector}`}
                    onClick={() => socialLinkHandler(_.url)}
                  >
                    {_.icon}
                  </div>
                ))}
              </div>
            </div>
            <div className={classes.black_shape}>
              <div className={classes.black_bg}>
                <BlackBg />
              </div>
            </div>
          </section>
        </Animate>
        <Animate>
          <section className={classes.options}>
            <div className={classes.option}>
              <div className={classes.option_icon}>
                <MailIcon />
              </div>
              <div className={classes.option_desc}>
                Please feel free to drop us a line. We will respond as soon as
                possible.
              </div>
              <a className={classes.btn} href={`mailto:${OFFICIAL_MAIL}`}>
                Send Email
              </a>
            </div>
            <div className={classes.hr}></div>
            <div className={classes.option}>
              <div className={classes.option_icon}>
                <PhoneIcon />
              </div>
              <div className={classes.option_desc}>
                If you need immediate assistance feel free to call us any time.
              </div>
              <a className={classes.btn} href="tel:647-564-6789">
                Call Us
              </a>
            </div>
          </section>
        </Animate>
        <Animate>
          <section className={classes.contact_us}>
            <h2 className={classes.contact_title}>Contact Us</h2>
            <div className={classes.row}>
              <TextField
                label={"First name*"}
                name="firstName"
                value={formData.firstName}
                required={true}
                errorMessage={"Please enter valid first name"}
                changeHandler={changeHandler}
                placeholder={"Enter your first name"}
              />
              <TextField
                label={"Last Name*"}
                name="lastName"
                value={formData.lastName}
                required={true}
                changeHandler={changeHandler}
                errorMessage={"Please enter valid last name"}
                placeholder={"Enter your last name"}
              />
            </div>
            <div className={classes.row}>
              <TextField
                type="email"
                label={"Email*"}
                name="email"
                value={formData.email}
                required={true}
                changeHandler={changeHandler}
                errorMessage={"Please enter valid email"}
                placeholder={"Enter your email"}
              />
              <TextField
                label={"Phone*"}
                name="phone"
                value={formData.phone}
                required={true}
                changeHandler={changeHandler}
                errorMessage={"Make sure phone number is correct"}
                placeholder={"Enter your phone number"}
              />
            </div>
            <div className={classes.row}>
              <TextField
                label={"Message (Optional)"}
                type="textarea"
                changeHandler={changeHandler}
                name="message"
                value={formData.message}
                required={false}
                placeholder="Enter message if any"
              />
            </div>
            <div
              className={
                classes.contact_btn + ` ${(!enabled || isSending) ? classes.disabled : ""}`
              }
              onClick={saveHandler}
            >
              Send request
            </div>
            {isError.error && (
              <Animate>
                <div className={classes.error}>{isError.message}</div>
              </Animate>
            )}
            {isSuccess && (
              <Animate>
                <div className={classes.success}>
                  Your request has been submitted successfully. We will get back
                  to you.
                </div>
              </Animate>
            )}
          </section>
        </Animate>
      </div>
    </>
  );
};

export default SupportPage;

import sgMail from "@sendgrid/mail";

export const sendEmail = async (to, subject, text, html) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from: "neelamr1508@gmail.com",
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(error);
  }
};

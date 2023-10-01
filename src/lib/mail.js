import sgMail from "@sendgrid/mail";

export const sendEmail = async (to, subject, text, html) => {
  sgMail.setApiKey("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");

  const msg = {
    to,
    from: "sharavinfotech@gmail.com",
    subject,
    text
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(error);
  }
};

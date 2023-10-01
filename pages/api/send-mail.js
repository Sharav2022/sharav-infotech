import { sendEmail } from "../../src/lib/mail";

export default async (req, res) => {
  //   const { email } = req.body;
  const body = req.body;
  try {
    await sendEmail(
      "sharavinfotech@gmail.com",
      "Enquiry :: Sharav Infotech",
      `
        First Name : ${body.firstName}
        Last Name : ${body.lastName}
        Email : ${body.email}
        Contact : ${body.phone}
        Message : ${body.message}
      `,
    );
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

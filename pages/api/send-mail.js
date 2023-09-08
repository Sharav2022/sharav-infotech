import { sendEmail } from "../../src/lib/mail";

export default async (req, res) => {
  //   const { email } = req.body;
  console.log("req", req.body);
  try {
    await sendEmail(
      "manikgarg06@gmail.com",
      "Test Email",
      "",
      '<strong>and easy to do anywhere, even with Node.js</strong>'
      // `<div style="display:flex;flex-direction:column;gap:24px">
      //   <div>First Name : Manik</div>
      // </div>`
    );
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

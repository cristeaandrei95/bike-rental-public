import nodemailer from "nodemailer";

export const sendEmail = ({ to, subject, body }) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: body,
  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.error(error);
    }
  });
};

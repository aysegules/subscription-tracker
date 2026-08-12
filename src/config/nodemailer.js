import nodemailer from "nodemailer";

const accountEmail = process.env.GOOGLE_ACCOUNT;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: accountEmail,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export { accountEmail, transporter };

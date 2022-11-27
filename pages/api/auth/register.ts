import type { NextApiRequest, NextApiResponse } from "next";
import verifyRegister from "../../../src/validators/verifyRegister";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../../../src/utils/sendVerificationEmail";
import { AuthService } from "../../../src/services/auth";

type Data = {
  message: string;
  status: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const body = await verifyRegister(req.body);

      await AuthService.isRegistered(body.email, body.userName);

      const token = jwt.sign(body, process.env.JWT_REGISTER_SECRET as string);

      await sendVerificationEmail(body.email, token);

      res.status(200).json({
        message: "Verification email sent",
        status: 200,
      });
      return;
    } catch (error) {
      res.json({
        message: (error as Error).message,
        status: 400,
      });
      return;
    }
  }

  res.status(404).json({
    message: "Not found",
    status: 404,
  });
}

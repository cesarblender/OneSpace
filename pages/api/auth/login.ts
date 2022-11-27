import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { AuthService } from "../../../src/services/auth";
import verifyLogin from "../../../src/validators/verifyLogin";

type Data = {
  refreshToken: string;
  status: number;
};

type Error = {
  message: string;
  status: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method === "POST") {
    try {
      const body = await verifyLogin(req.body);

      const { id, password } = await AuthService.loginUser(body);

      const refreshToken = jwt.sign(
        { id, password },
        process.env.JWT_REFRESH_SECRET as string,
        {
          expiresIn: "90d",
        }
      );

      //   await sendLoginAlertEmail(body.email);

      res.status(200).json({
        refreshToken,
        status: 200,
      });
      return;
    } catch (error) {
      res.status(400).json({
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

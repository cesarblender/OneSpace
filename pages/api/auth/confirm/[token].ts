import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { BodyInterface } from "../../../../src/validators/verifyRegister";
import { AuthService } from "../../../../src/services/auth";

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
  try {
    const { token } = req.query;

    const user: BodyInterface = jwt.verify(
      token as string,
      process.env.JWT_REGISTER_SECRET as string
    ) as BodyInterface;

    const { id, password } = await AuthService.registerUser(user);

    const refreshToken = jwt.sign(
      { id, password },
      process.env.JWT_REFRESH_SECRET as string,
      {
        expiresIn: "90d",
      }
    );

    res.status(201).json({
      refreshToken,
      status: 201,
    });

    res.redirect('/auth/success')
    return;
  } catch (error) {
    res.status(403).json({
      message: (error as Error).message,
      status: 403,
    });
    return;
  }
}

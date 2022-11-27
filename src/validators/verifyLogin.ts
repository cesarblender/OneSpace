import { EMAIL_REGEX } from "../regex";
import { ERRORS } from "../errors";

export interface BodyInterface {
  email: string;
  password: string;
}

export default async function verifyLogin(
  body: BodyInterface
): Promise<BodyInterface> {
  body.email = body.email.trim();
  
  if (!EMAIL_REGEX.test(body.email)) throw new Error(ERRORS.INVALID_EMAIL);

  if (body.password.length < 8) throw new Error(ERRORS.SHORT_PASSWORD);
  if (body.password.length > 60) throw new Error(ERRORS.LONG_PASSWORD);

  return body;
}

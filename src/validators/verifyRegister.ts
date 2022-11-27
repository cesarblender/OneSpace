import { NAME_REGEX, USER_NAME_REGEX, EMAIL_REGEX } from "../regex";
import { ERRORS } from "../errors";
import Filter from "bad-words";
import spanishbadwords from "../censor/spanish-words.json";
import bcrypt from "bcrypt";
import { capitalize } from "../utils/capitalizeString";
import { calculateAge } from "../utils/calculateAge";
import { Gender } from "../entity/User";
import dayjs from 'dayjs';

const filter = new Filter();

export interface BodyInterface {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  birthday: Date;
  gender: Gender;
}

export default async function verifyRegister(
  body: BodyInterface
): Promise<BodyInterface> {
  body.firstName = capitalize(body.firstName.trim());
  body.lastName = capitalize(body.lastName.trim());
  body.userName = body.userName.trim();
  body.email = body.email.trim();

  if (!NAME_REGEX.test(body.firstName))
    throw new Error(ERRORS.INVALID_FIRST_NAME);
  if (!NAME_REGEX.test(body.lastName))
    throw new Error(ERRORS.INVALID_LAST_NAME);
  if (!USER_NAME_REGEX.test(body.userName))
    throw new Error(ERRORS.INVALID_USER_NAME);
  if (!EMAIL_REGEX.test(body.email)) throw new Error(ERRORS.INVALID_EMAIL);

  const birthday = dayjs(body.birthday, "YYYY/MM/DD").toDate();

  if (calculateAge(birthday) < 13) throw new Error(ERRORS.TOO_YOUNG);
  if (calculateAge(birthday) > 125) throw new Error(ERRORS.TOO_OLD);

  if (body.password.length < 8) throw new Error(ERRORS.SHORT_PASSWORD);
  if (body.password.length > 60) throw new Error(ERRORS.LONG_PASSWORD);

  filter.addWords(...spanishbadwords);

  if (filter.isProfane(body.firstName))
    throw new Error(ERRORS.FIRST_NAME_CONTAINS_OFFENSIVE_WORDS);
  if (filter.isProfane(body.lastName))
    throw new Error(ERRORS.LAST_NAME_CONTAINS_OFFENSIVE_WORDS);

  const salt = await bcrypt.genSalt();
  body.password = await bcrypt.hash(body.password, salt);

  return body;
}

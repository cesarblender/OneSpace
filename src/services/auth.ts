import type { BodyInterface as RegisterBodyInterface } from "../validators/verifyRegister";
import type { BodyInterface as LoginBodyInterface } from "../validators/verifyLogin";
import { getUserRepository } from "../repository/user";
import { ERRORS } from "../errors";
import { User } from "../entity/User";
import bcrypt from "bcrypt";

type Property = "firstName" | "lastName" | "userName" | "email" | "password";

export namespace AuthService {
  export async function registerUser(
    body: RegisterBodyInterface
  ): Promise<{ id: number; password: string }> {
    const userRepository = await getUserRepository();

    const isEmailInUse = !!(await userRepository.findOneBy({
      email: body.email,
    }));

    const isUserNameInUse = !!(await userRepository.findOneBy({
      userName: body.userName,
    }));

    if (isEmailInUse) throw new Error(ERRORS.EMAIL_IN_USE);
    if (isUserNameInUse) throw new Error(ERRORS.USER_NAME_IN_USE);

    const user = new User();

    for (const property in body) {
      if (property === "birthday" || property === "gender") continue;
      user[property as Property] = body[property as Property];
    }

    user.gender = body.gender;
    user.birthday = new Date(body.birthday);

    const { id, password } = await userRepository.save(user);

    return { id, password };
  }

  export async function isRegistered(
    email: string,
    userName: string
  ): Promise<boolean> {
    const userRepository = await getUserRepository();

    const isEmailInUse = !!(await userRepository.findOneBy({ email }));

    const isUserNameInUse = !!(await userRepository.findOneBy({ userName }));

    if (isEmailInUse) throw new Error(ERRORS.EMAIL_IN_USE);
    if (isUserNameInUse) throw new Error(ERRORS.USER_NAME_IN_USE);

    return false;
  }

  export async function loginUser(
    body: LoginBodyInterface
  ): Promise<{ id: number; password: string }> {
    const userRepository = await getUserRepository();

    const user = await userRepository.findOneBy({
      email: body.email,
    });

    if (!user) throw new Error(ERRORS.INCORRECT_EMAIL);

    const isCorrectPassword = await bcrypt.compare(
      body.password,
      user.password
    );

    if (!isCorrectPassword) throw new Error(ERRORS.INCORRECT_PASSWORD);

    return { id: user.id, password: user.password };
  }
}

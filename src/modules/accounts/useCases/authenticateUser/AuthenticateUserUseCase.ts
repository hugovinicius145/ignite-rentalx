import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Verificar se o usuario existe
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("Email or Password Incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    // senha esta correta
    if (!passwordMatch) {
      throw new Error("Email or Password Incorrect!");
    }

    const token = sign({}, "46adac11a1fdc2cd66996a7b976f5521", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      }
    }

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase }
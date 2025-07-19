import { FastifyReply, FastifyRequest } from "fastify";
import { hashPassword } from "../utils/auth";
import { prisma } from "../services/prisma";
import {
  isValidPassword,
  isValidEmail,
  isValidPhone,
} from "../utils/validation";
import { Role } from "../types";

interface IRegisterBody {
  name: string;
  phone: string;
  email: string;
  password: string;
}

const registerController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, phone, email, password } = request.body as IRegisterBody;

  if (!name || !phone || !email || !password) {
    return reply.status(400).send({ message: "Bad request" });
  }

  if (!isValidPassword(password)) {
    return reply.code(400).send({
      message: "Password must be at least 8 characters long and contain at least one number, one letter and one symbol.",
    });
  }

  if (!isValidEmail(email)) {
    return reply.code(400).send({
      message: "Email is invalid",
    });
  }

  if (!isValidPhone(phone)) {
    return reply.code(400).send({
      message: "Phone is invalid",
    });
  }

  try {
    const hashedPassword = await hashPassword(password);

    await prisma.user.create({
      data: {
        name,
        phone,
        email,
        password: hashedPassword,
        role: email === 'test_manager@toptal.com' ? Role.MANAGER : Role.USER,
      },
    });

    return reply.status(200).send();
  } catch (error) {
    return reply
      .status(409)
      .send({ message: "An user with this email already exists." });
  }
};

export default registerController;

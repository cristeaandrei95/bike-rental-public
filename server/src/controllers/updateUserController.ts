import { FastifyReply, FastifyRequest } from "fastify";
import generatePassword from "omgopass";
import { hashPassword } from "../utils/auth";
import { prisma } from "../services/prisma";
import { isValidEmail, isValidPhone } from "../utils/validation";
import { sendEmail } from "../utils/sendEmail";
import { Role } from "../types";

interface Params {
  uid: string;
}

interface Body {
  name: string;
  phone: string;
  email: string;
  role: Role;
}

const updateUserController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { uid } = request.params as Params;
  const { name, phone, email, role } = request.body as Body;

  try {
    const user = await prisma.user.update({
      where: {
        id: +uid,
      },
      data: {
        name,
        phone,
        email,
        role,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        role: true,
      },
    });

    return reply.status(200).send(user);
  } catch (error) {
    return reply.status(409).send({ message: "An user with this email already exists." });
  }
};

export default updateUserController;

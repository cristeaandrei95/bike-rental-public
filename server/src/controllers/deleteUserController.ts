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

const deleteUserController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { uid } = request.params as Params;

  if (!uid) {
    return reply.status(400).send({ message: "Bad request" });
  }

  try {
    await prisma.user.delete({
      where: {
        id: +uid,
      },
    });

    return reply.status(200).send();
  } catch (error) {
    return reply.status(403).send();
  }
};

export default deleteUserController;

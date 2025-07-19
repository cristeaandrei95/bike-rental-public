import { FastifyReply, FastifyRequest } from "fastify";
import { signJWT, hashPassword } from "../utils/auth";
import { prisma } from "../services/prisma";
import { verifyPassword } from "../utils/auth";

interface IResetPasswordBody {
  email: string;
  tempPassword: string;
  password: string;
}

const resetPasswordController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { email, tempPassword, password } = request.body as IResetPasswordBody;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    const isValid = await verifyPassword(tempPassword, user.password);

    if (!isValid) {
      return reply
        .status(401)
        .send({ message: "Invalid email or password. Please try again." });
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });

    reply.status(200).send();
  } catch (error) {
    console.error(error.message);
    reply.status(400).send({ message: "Bad request" });
  }
};

export default resetPasswordController;

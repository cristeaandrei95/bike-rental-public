import { FastifyReply, FastifyRequest } from "fastify";
import { signJWT, verifyPassword } from "../utils/auth";
import { prisma } from "../services/prisma";

interface ILoginBody {
  email: string;
  password: string;
}

const loginController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { email, password: providedPassword } = request.body as ILoginBody;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return reply
        .status(401)
        .send({ message: "Invalid email or password. Please try again." });
    }

    const isValid = await verifyPassword(providedPassword, user.password);

    if (!isValid) {
      return reply
        .status(401)
        .send({ message: "Invalid email or password. Please try again." });
    }

    const { id, name, role } = user;
    const token = await signJWT({ id, name, role });

    reply.send({ token });
  } catch (error) {
    console.error(error.message);
    reply.status(400).send({ message: "Bad request" });
  }
};

export default loginController;

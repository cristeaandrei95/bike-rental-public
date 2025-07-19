import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../services/prisma";

interface Params {
  bid: string;
}

const deleteBookingController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { bid } = request.params as Params;

  if (!bid) {
    return reply.status(400).send({ message: "Bad request" });
  }

  try {
    await prisma.booking.delete({
      where: {
        id: +bid,
      },
    });

    return reply.status(200).send();
  } catch (error) {
    return reply.status(403).send();
  }
};

export default deleteBookingController;

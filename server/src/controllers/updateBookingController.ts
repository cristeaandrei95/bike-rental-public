import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../services/prisma";

interface Params {
  bid: string;
}

interface Body {
  completed: boolean;
}

const updateBookingController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { bid } = request.params as Params;
  const { completed } = request.body as Body;

  try {
    const booking = await prisma.booking.update({
      where: {
        id: +bid,
      },
      data: {
        completed,
      },
    });

    return reply.status(200).send(booking);
  } catch (error) {
    return reply.status(403).send();
  }
};

export default updateBookingController;

import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../services/prisma";

interface Params {
  uid: string;
  bid: string;
}

interface Body {
  score: number;
}

const createBookingRatingController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { uid, bid } = request.params as Params;

  if (!uid || !bid) {
    return reply.status(400).send({ message: "Bad request" });
  }

  const { score } = request.body as Body;

  if (!score) {
    return reply.status(400).send({ message: "Bad request" });
  }

  const booking = await prisma.booking.findUnique({
    where: {
      id: +bid,
    },
  });

  if (!booking) {
    return reply.status(404).send({ message: "Booking not found" });
  }

  try {
    const newRating = await prisma.rating.create({
      data: {
        user: {
          connect: {
            id: +uid,
          },
        },
        bike: {
          connect: {
            id: booking.bikeId,
          },
        },
        booking: {
          connect: {
            id: +bid,
          },
        },
        score,
      },
    });

    return reply.status(201).send(newRating);
  } catch (error) {
    console.error(error);
    return reply.status(422).send();
  }
};

export default createBookingRatingController;

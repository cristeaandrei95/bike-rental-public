import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../services/prisma";
import { DEFAULT_RATING } from '../constants';

interface Params {
  uid: string;
}

const readUserBookingController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { uid } = request.params as Params;

  if (!uid) {
    return reply.status(400).send({ message: "Bad request" });
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId: +uid,
      },
      include: {
        bike: {
          select: {
            id: true,
            model: true,
            color: true,
            imageUrl: true,
            rating: {
              select: {
                score: true,
              },
            },
          },
        },
        rating: {
          select: {
            score: true,
          },
        },
      },
    });

    const bikeWithRatingSum = (bike) => ({
      ...bike,
      rating: parseFloat((
        bike.rating.reduce((acc, cur) => (acc += cur.score), 0) /
          bike.rating.length || DEFAULT_RATING
      ).toFixed(2)),
    });

    const bookingsWithRatingSum = bookings.map((booking) => ({
      ...booking,
      bike: bikeWithRatingSum(booking.bike),
    }));

    return reply.status(200).send(bookingsWithRatingSum);
  } catch (error) {
    return reply.status(404).send();
  }
};

export default readUserBookingController;

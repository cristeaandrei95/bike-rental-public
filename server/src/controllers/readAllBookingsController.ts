import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../services/prisma";

interface Query {
  page: string;
  perPage: string;
}

const readAllBookingsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { page: pageQS, perPage: perPageQS } = request.query as Query;
  const page = pageQS ? parseInt(pageQS) : 1;
  const perPage = perPageQS ? parseInt(perPageQS) : 10;

  const bookings = await prisma.booking.findMany({
    skip: (page - 1) * perPage,
    take: perPage,
    select: {
      rating: {
        select: {
          score: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      id: true,
      price: true,
      pickupDate: true,
      pickupLocation: true,
      dropoffDate: true,
      dropoffLocation: true,
      completed: true,
    },
  });

  const bookingsWithRatingSum = bookings.map((booking) => ({
    ...booking,
    rating: booking.rating[0]?.score || 0,
  }));

  const count = await prisma.booking.count();

  return reply.send({
    bookings: bookingsWithRatingSum,
    count,
    totalPages: Math.ceil(count / perPage),
  });
};

export default readAllBookingsController;

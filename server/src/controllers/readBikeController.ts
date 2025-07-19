import { Bike } from "@prisma/client";
import dayjs from "dayjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../services/prisma";
import { DEFAULT_RATING } from '../constants';

interface Params {
  bid: string;
}

interface Query {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
}

const readBikeController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { bid } = request.params as Params;
  const { pickupLocation, dropoffLocation, pickupDate, dropoffDate } =
    request.query as Query;

  if (!bid) {
    return reply.status(400).send({ message: "Bad request" });
  }

  try {
    const bike = await prisma.bike.findUnique({
      where: {
        id: +bid,
      },
      include: {
        rating: {
          select: {
            score: true,
          },
        },
        booking: {
          select: {
            pickupDate: true,
            dropoffDate: true,
          },
        },
      },
    });

    const UTCPickupDate = dayjs.utc(pickupDate);
    const UTCDropoffDate = dayjs.utc(dropoffDate);

    const bookings = await prisma.booking.findMany({
      where: {
        AND: [
          {
            bike: {
              id: +bid,
            },
          },
          {
            pickupDate: {
              lte: UTCDropoffDate.toDate(),
            },
          },
          {
            dropoffDate: {
              gt: UTCPickupDate.toDate(),
            },
          },
        ],
      },
    });

    const calculatePrice = (bike: Partial<Bike>) => ({
      ...bike,
      priceForInterval:
        (pickupDate &&
          dropoffDate &&
          (
            bike.pricePerHour *
            (dayjs(dropoffDate).diff(pickupDate, "hour") + 1)
          ).toFixed(2) + "$") ||
        null,
    });

    const sumRating = (bike) => ({
      ...bike,
      rating: parseFloat((( bike.rating.reduce((acc, cur) => (acc += cur.score), 0) / bike.rating.length) || DEFAULT_RATING).toFixed(2)),
    });

    const removeBookingFiled = ({ booking, ...bike }) => ({
      ...bike,
    });

    const updateAvailability = (bike) => ({
      ...bike,
      isAvailable: bookings.length ? false : bike.isAvailable,
    });

    const bikeWithCalculatedPrice = calculatePrice(bike);
    const bikeWithRatingSum = sumRating(bikeWithCalculatedPrice);
    const bikeWithoutBookingField = removeBookingFiled(bikeWithRatingSum);
    const bikeWithUpdatedAvailability = updateAvailability(
      bikeWithoutBookingField
    );

    return reply.status(200).send(bikeWithUpdatedAvailability);
  } catch (error) {
    return reply.status(404).send();
  }
};

export default readBikeController;

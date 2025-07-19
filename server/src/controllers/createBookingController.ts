import { FastifyReply, FastifyRequest } from "fastify";
import dayjs from "dayjs";
import { prisma } from "../services/prisma";
import getCeilHoursBetweenTwoDates from "../utils/getCeilHoursBetweenTwoDates";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

interface Params {
  uid: string;
}

interface Body {
  bikeId: number;
  pickupDate: string;
  pickupLocation: string;
  dropoffDate: string;
  dropoffLocation: string;
}

const createBookingController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { uid } = request.params as Params;

  if (!uid) {
    return reply.status(400).send({ message: "Bad request" });
  }

  const { bikeId, pickupDate, pickupLocation, dropoffDate, dropoffLocation } =
    request.body as Body;

  if (
    !bikeId ||
    !pickupDate ||
    !pickupLocation ||
    !dropoffDate ||
    !dropoffLocation
  ) {
    return reply.status(400).send({ message: "Bad request" });
  }

  const UTCPickupDate = dayjs.utc(pickupDate);
  const UTCDropoffDate = dayjs.utc(dropoffDate);

  try {
    const bike = await prisma.bike.findUnique({
      where: {
        id: bikeId,
      },
    });

    if (!bike) {
      return reply.status(404).send({ message: "Bike not found" });
    }

    if (!bike.isAvailable) {
      return reply
        .status(403)
        .send({ message: "Bike is not available for booking at the moment." });
    }

    const bookings = await prisma.booking.findMany({
      where: {
        AND: [
          {
            bike: {
              id: bikeId,
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

    if (bookings.length > 0) {
      return reply
        .status(403)
        .send({ message: "Bike is already booked for the selected dates" });
    }

    const bookingHours = getCeilHoursBetweenTwoDates(
      UTCPickupDate,
      UTCDropoffDate
    );
    const bookingPrice = bookingHours * bike.pricePerHour;

    const booking = await prisma.booking.create({
      data: {
        user: {
          connect: {
            id: +uid,
          },
        },
        bike: {
          connect: {
            id: bikeId,
          },
        },
        pickupDate: UTCPickupDate.toDate(),
        pickupLocation,
        dropoffDate: UTCDropoffDate.toDate(),
        dropoffLocation,
        price: bookingPrice,
      },
    });

    return reply.status(201).send(booking);
  } catch (error) {
    console.error(error);
    return reply.status(422).send();
  }
};

export default createBookingController;

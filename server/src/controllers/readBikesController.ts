import { Bike } from "@prisma/client";
import dayjs from "dayjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../services/prisma";
import { DEFAULT_RATING } from '../constants';

interface Query {
  page: string;
  perPage: string;
  model: string;
  color: string;
  pickupLocation: string;
  rating: string;
  pickupDate: string;
  dropoffDate: string;
}

const readBikesController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const {
    page: pageQS,
    perPage: perPageQS,
    model,
    color,
    pickupLocation,
    rating = "",
    pickupDate,
    dropoffDate,
  } = request.query as Query;
  const page = pageQS ? parseInt(pageQS) : 1;
  const perPage = perPageQS ? parseInt(perPageQS) : 10;

  try {
    const UTCPickupDate = pickupDate && dayjs.utc(pickupDate);
    const UTCDropoffDate = dropoffDate && dayjs.utc(dropoffDate);

    const filters = {
      AND: [
        {
          OR: [{}, {}],
        },
        {
          OR: [{}, {}],
        },
      ],
      location: {
        contains: pickupLocation,
      },
    };

    if (model) {
      const models = model.split(",");

      filters["AND"].push({
        OR: models.map((model) => ({ model: { contains: model } })),
      });
    }

    if (color) {
      const colors = color.split(",");

      filters["AND"].push({
        OR: colors.map((color) => ({ color: { contains: color } })),
      });
    }

    if (UTCDropoffDate && UTCPickupDate) {
      filters["booking"] = {
        none: {
          AND: [
            {
              pickupDate: {
                lte: UTCDropoffDate && UTCDropoffDate.toDate(),
              },
            },
            {
              dropoffDate: {
                gt: UTCPickupDate && UTCPickupDate.toDate(),
              },
            },
          ],
        },
      };
    }

    const bikes = await prisma.bike.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      where: filters,
      select: {
        id: true,
        model: true,
        color: true,
        location: true,
        imageUrl: true,
        isAvailable: true,
        pricePerHour: true,
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

    const bikeWithCalculatedPrice = (bike: Partial<Bike>) => ({
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

    const bikeWithRatingSum = (bike) => ({
      ...bike,
      rating: parseFloat(((bike.rating.reduce((acc, cur) => (acc += cur.score), 0) / bike.rating.length) || DEFAULT_RATING).toFixed(2)),
    });

    const bikeWithoutBookingField = ({ booking, ...bike }) => ({
      ...bike,
    });

    const bikeWithFilteredRating = (bike) =>
      rating.split(",").includes(String(Math.floor(bike.rating)));

    const count = await prisma.bike.count({
      where: filters,
    });

    const mappedBikes = bikes
      .map(bikeWithCalculatedPrice)
      .map(bikeWithRatingSum)
      .map(bikeWithoutBookingField);

    return reply.send({
      bikes: rating ? mappedBikes.filter(bikeWithFilteredRating) : mappedBikes,
      count,
      totalPages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.error(error);
    return reply.status(422).send();
  }
};

export default readBikesController;

import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../services/prisma";

const readLocationsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const locations = await prisma.bike.findMany({
    distinct: ["location"],
    select: {
      location: true,
    },
  });

  const mappedLocations = locations.map((item) => item.location);

  return reply.send(mappedLocations);
};

export default readLocationsController;

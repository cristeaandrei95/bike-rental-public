import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../services/prisma";

const readFiltersController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const models = await prisma.bike.findMany({
    distinct: ["model"],
    select: {
      model: true,
    },
  });

  const colors = await prisma.bike.findMany({
    distinct: ["color"],
    select: {
      color: true,
    },
  });

  const filters = [
    {
      label: "Model",
      items: models.map((item) => item.model),
    },
    {
      label: "Color",
      items: colors.map((item) => item.color),
    },
    {
      label: "Rating",
      items: ["1", "2", "3", "4", "5"],
    }
  ];

  return reply.send(filters);
};

export default readFiltersController;

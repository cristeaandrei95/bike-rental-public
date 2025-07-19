import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../services/prisma";

interface Query {
  page: string;
  perPage: string;
}

const readUsersController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { page: pageQS, perPage: perPageQS } = request.query as Query;
  const page = pageQS ? parseInt(pageQS) : 1;
  const perPage = perPageQS ? parseInt(perPageQS) : 10;

  const users = await prisma.user.findMany({
    skip: (page - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      role: true,
    },
  });

  const count = await prisma.user.count();

  return reply.send({
    users,
    count,
    totalPages: Math.ceil(count / perPage),
  });
};

export default readUsersController;

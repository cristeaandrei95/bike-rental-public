import { FastifyReply, FastifyRequest } from "fastify";

const healthCheckController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  reply.status(200).send();
};

export default healthCheckController;

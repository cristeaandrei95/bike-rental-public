import { FastifyReply, FastifyRequest } from "fastify";
import { verifyJWT } from "../utils/auth";
import { Role } from "../types";

const authorizationMiddleware =
  ({ allowedRoles }: { allowedRoles: Role[] }) =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    const { authorization } = request.headers;

    if (!authorization) {
      return reply.status(401).send();
    }

    const token = authorization.replace("Bearer ", "");
    try {
      const user = await verifyJWT(token);

      // @ts-ignore
      if (!allowedRoles.includes(user?.role)) {
        return reply.status(401).send();
      }
    } catch (error) {
      return reply.status(401).send();
    }
  };

export default authorizationMiddleware;

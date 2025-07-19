import registerController from "../../controllers/registerController";
import loginController from "../../controllers/loginController";
import forgotPasswordController from "../../controllers/forgotPasswordController";
import resetPasswordController from "../../controllers/resetPasswordController";
import healthCheckController from "../../controllers/healthCheckController";
import readUsersController from "../../controllers/readUsersController";
import createUserController from "../../controllers/createUserController";
import updateUserController from "../../controllers/updateUserController";
import deleteUserController from "../../controllers/deleteUserController";
import readBikesController from "../../controllers/readBikesController";
import readBikeController from "../../controllers/readBikeController";
import createBikeController from "../../controllers/createBikeController";
import updateBikeController from "../../controllers/updateBikeController";
import deleteBikeController from "../../controllers/deleteBikeController";
import readAllBookingsController from "../../controllers/readAllBookingsController";
import updateBookingController from "../../controllers/updateBookingController";
import readUserBookingController from "../../controllers/readUserBookingController";
import createBookingController from "../../controllers/createBookingController";
import deleteBookingController from "../../controllers/deleteBookingController";
import createBookingRatingController from "../../controllers/createBookingRatingController";
import readFiltersController from "../../controllers/readFiltersController";
import readLocationsController from "../../controllers/readLocationsController";
import authorizationMiddleware from "../../middlewares/authorizationMiddleware";
import { Role } from "../../types";

export default function (fastify, opts, done) {
  fastify.get("/health/live", healthCheckController);

  fastify.post("/register", registerController);
  fastify.post("/login", loginController);
  fastify.post("/forgot-password", forgotPasswordController);
  fastify.post("/reset-password", resetPasswordController);

  fastify.get(
    "/users",
    { preHandler: [authorizationMiddleware({ allowedRoles: [Role.MANAGER] })] },
    readUsersController
  );

  fastify.post(
    "/users",
    { preHandler: [authorizationMiddleware({ allowedRoles: [Role.MANAGER] })] },
    createUserController
  );

  fastify.patch(
    "/users/:uid",
    { preHandler: [authorizationMiddleware({ allowedRoles: [Role.MANAGER] })] },
    updateUserController
  );

  fastify.delete(
    "/users/:uid",
    { preHandler: [authorizationMiddleware({ allowedRoles: [Role.MANAGER] })] },
    deleteUserController
  );

  fastify.get(
    "/filters",
    {
      preHandler: [
        authorizationMiddleware({ allowedRoles: [Role.USER, Role.MANAGER] }),
      ],
    },
    readFiltersController
  );

  fastify.get(
    "/locations",
    {
      preHandler: [
        authorizationMiddleware({ allowedRoles: [Role.USER, Role.MANAGER] }),
      ],
    },
    readLocationsController
  );

  fastify.get(
    "/bikes",
    {
      preHandler: [
        authorizationMiddleware({ allowedRoles: [Role.USER, Role.MANAGER] }),
      ],
    },
    readBikesController
  );

  fastify.get(
    "/bikes/:bid",
    {
      preHandler: [
        authorizationMiddleware({ allowedRoles: [Role.USER, Role.MANAGER] }),
      ],
    },
    readBikeController
  );

  fastify.post(
    "/bikes",
    { preHandler: [authorizationMiddleware({ allowedRoles: [Role.MANAGER] })] },
    createBikeController
  );

  fastify.patch(
    "/bikes/:bid",
    { preHandler: [authorizationMiddleware({ allowedRoles: [Role.MANAGER] })] },
    updateBikeController
  );

  fastify.delete(
    "/bikes/:bid",
    { preHandler: [authorizationMiddleware({ allowedRoles: [Role.MANAGER] })] },
    deleteBikeController
  );

  fastify.get(
    "/bookings",
    { preHandler: [authorizationMiddleware({ allowedRoles: [Role.MANAGER] })] },
    readAllBookingsController
  );

  fastify.patch(
    "/bookings/:bid",
    { preHandler: [authorizationMiddleware({ allowedRoles: [Role.MANAGER] })] },
    updateBookingController
  );

  fastify.get(
    "/users/:uid/bookings",
    {
      preHandler: [
        authorizationMiddleware({ allowedRoles: [Role.USER, Role.MANAGER] }),
      ],
    },
    readUserBookingController
  );

  fastify.post(
    "/users/:uid/bookings",
    {
      preHandler: [
        authorizationMiddleware({ allowedRoles: [Role.USER, Role.MANAGER] }),
      ],
    },
    createBookingController
  );

  fastify.delete(
    "/users/:uid/bookings/:bid",
    {
      preHandler: [
        authorizationMiddleware({ allowedRoles: [Role.USER, Role.MANAGER] }),
      ],
    },
    deleteBookingController
  );

  fastify.post(
    "/users/:uid/bookings/:bid/ratings",
    {
      preHandler: [
        authorizationMiddleware({ allowedRoles: [Role.USER, Role.MANAGER] }),
      ],
    },
    createBookingRatingController
  );

  done();
}

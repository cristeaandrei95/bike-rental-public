import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../services/prisma";
import uploadImage from "../services/cloudinary";

interface Body {
  model: string;
  color: string;
  location: string;
  pricePerHour: string;
}

const createBikeController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  // @ts-ignore
  const files = request.raw.files;
  const { model, color, location, pricePerHour } = request.body as Body;

  if (!model || !color || !location || !pricePerHour || !files?.image) {
    return reply.status(400).send({ message: "Bad request" });
  }

  try {
    // @ts-ignore
    const { secure_url: imageUrl } = await uploadImage(files.image.data);

    const bike = await prisma.bike.create({
      data: {
        model,
        color,
        location,
        pricePerHour: +pricePerHour,
        imageUrl,
      },
    });

    return reply.status(201).send(bike);
  } catch (error) {
    console.error(error);
    return reply.status(422).send();
  }
};

export default createBikeController;

import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../services/prisma";
import uploadImage from "../services/cloudinary";

interface Params {
  bid: string;
}

interface Body {
  model?: string;
  color?: string;
  location?: string;
  pricePerHour?: string;
  isAvailable?: boolean;
}

const updateBikeController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  // @ts-ignore
  const files = request.raw.files;
  const { bid } = request.params as Params;
  const { model, color, location, pricePerHour, isAvailable } =
    request.body as Body;

  try {
    let imageUrl;

    if (files?.image) {
      const cloudinaryResponse = await uploadImage(files.image.data);
      // @ts-ignore
      imageUrl = cloudinaryResponse.secure_url;
    }

    const bike = await prisma.bike.update({
      where: {
        id: +bid,
      },
      data: {
        model,
        color,
        location,
        pricePerHour: +pricePerHour,
        imageUrl,
        isAvailable,
      },
    });

    return reply.status(200).send(bike);
  } catch (error) {
    return reply.status(403).send();
  }
};

export default updateBikeController;

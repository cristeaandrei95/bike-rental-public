import { FastifyReply, FastifyRequest } from "fastify";
import { sendEmail } from "../utils/sendEmail";
import { hashPassword } from "../utils/auth";
import generatePassword from "omgopass";
import { prisma } from "../services/prisma";

interface IForgotPasswordBody {
  email: string;
}

const forgotPasswordController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { email } = request.body as IForgotPasswordBody;

  if (!email) {
    return reply.status(400).send({ message: "Bad request" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return reply.status(200).send();
    }

    const temporaryPassword = generatePassword({
      syllablesCount: 2,
      separators: "_",
    });
    const hashedPassword = await hashPassword(temporaryPassword);

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });

    const emailContent = `
       <div>
           <p>Hi, your temporary password is: ${temporaryPassword}</p>
           <p>You can change your password by clicking the link bellow.</p>
           <br />
           <a href="${process.env.WEB_APP_URL}/reset-password?email=${email}&tempPassword=${temporaryPassword}">Reset password</a>
       </div>     
   `;

    sendEmail({
      subject: "Rent a bike reset password",
      to: email,
      body: emailContent,
    });

    reply.status(200).send({});
  } catch (error) {
    reply.status(400).send({ message: "Bad request" });
  }
};

export default forgotPasswordController;

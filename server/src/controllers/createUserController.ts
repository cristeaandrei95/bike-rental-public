import { FastifyReply, FastifyRequest } from "fastify";
import generatePassword from "omgopass";
import { hashPassword } from "../utils/auth";
import { prisma } from "../services/prisma";
import { isValidEmail, isValidPhone } from "../utils/validation";
import { sendEmail } from "../utils/sendEmail";
import { Role } from "../types";

interface Body {
  name: string;
  phone: string;
  email: string;
  role: Role;
}

const createUserController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, phone, email, role } = request.body as Body;

  if (!name || !phone || !email || !role) {
    return reply.status(400).send({ message: "Bad request" });
  }

  if (!isValidEmail(email)) {
    return reply.code(400).send({
      message: "Email is invalid",
    });
  }

  if (!isValidPhone(phone)) {
    return reply.code(400).send({
      message: "Phone is invalid",
    });
  }

  try {
    const temporaryPassword = generatePassword({
      syllablesCount: 2,
      separators: "_",
    });
    const hashedPassword = await hashPassword(temporaryPassword);

    const user = await prisma.user.create({
      data: {
        name,
        phone,
        email,
        password: hashedPassword,
        role: role,
      },
    });

    const emailContent = `
       <div>
           <p>Hi ${name},</p>
           <p>your temporary password is: ${temporaryPassword}</p>
           <p>You can change your password by clicking the link bellow.</p>
           <br />
           <a href="${process.env.WEB_APP_URL}/reset-password?email=${email}&tempPassword=${temporaryPassword}">Reset password</a>
       </div>     
   `;

    sendEmail({
      subject: "Welcome to Rent a bike!",
      to: email,
      body: emailContent,
    });

    return reply.status(201).send(user);
  } catch (error) {
    return reply
      .status(409)
      .send({ message: "An user with this email already exists." });
  }
};

export default createUserController;

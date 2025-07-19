import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = async (password: string) => {
  const SALT_ROUNDS = 10;

  try {
    return await bcrypt.hash(password, SALT_ROUNDS);
  } catch (error) {
    console.error(error.message);
  }
};

export const verifyPassword = async (
  userPassword: string,
  hashedPassword: string
) => {
  try {
    return await bcrypt.compare(userPassword, hashedPassword);
  } catch (error) {
    console.error(error.message);
  }
};

export const signJWT = async (data: any) => {
  try {
    return await jwt.sign(data, process.env.JWT_SECRET);
  } catch (error) {
    console.error(error.message);
  }
};

export const verifyJWT = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET);

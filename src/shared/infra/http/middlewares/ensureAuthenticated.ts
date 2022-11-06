import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

interface ITokenPayload {
  id: number;
  iat: number;
  exp: number;
}

function verifyToken(secret: string) {
  return (req: Request, _: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AppError({ status: 401, message: "Token not found" });
    }

    const [, token] = authorization.split(" ");

    try {
      const { id } = jwt.verify(token, secret) as ITokenPayload;

      req.userId = id;

      return next();
    } catch {
      throw new AppError({
        status: 401,
        message: "Token authentication failed",
      });
    }
  };
}

export const ensureAthenticated = verifyToken(process.env.JWT_SECRET!);

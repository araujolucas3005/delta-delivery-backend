import { NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";
import { ErrorTypesEnum } from "../../../types/ErrorTypes";
import { AppError } from "../errors/AppError";

export function errorHandlerMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  // eslint-disable-next-line no-console
  console.log(err);

  if (err instanceof ValidationError) {
    return res.status(400).json({
      status: 400,
      type: ErrorTypesEnum.BODY_VALIDATION,
      messages: err.errors,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.status).json({ ...err });
  }

  return res.status(500).json({
    message: "Internal server error",
    status: 500,
    type: "[internal]",
  });
}

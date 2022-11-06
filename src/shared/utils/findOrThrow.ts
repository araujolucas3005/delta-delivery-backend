import { AppError } from "../infra/http/errors/AppError";

export async function findOrThrow<T>(
  entityName: string,
  func: () => Promise<T>,
) {
  const item = await func();

  if (!item) {
    throw new AppError({ message: `${entityName} not found`, status: 404 });
  }

  return item;
}

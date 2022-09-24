import { AnySchema } from "yup";

export const validateSchema = (
  schema: AnySchema,
  data: any,
  abortEarly = true,
) => schema.validateSync(data, { stripUnknown: true, abortEarly });

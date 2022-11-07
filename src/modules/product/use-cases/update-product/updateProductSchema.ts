import * as yup from "yup";

export const updateProductSchema = yup.object().shape({
  name: yup.string().min(3).notRequired(),
  description: yup.string().min(3).notRequired(),
  isAvailable: yup.boolean().notRequired(),
  imageUrl: yup.string().notRequired(),
  price: yup.number().optional(),
  sizes: yup.array().of(
    yup
      .object({
        productRelationId: yup.string().uuid().notRequired(),
        id: yup.string().uuid().required(),
        price: yup.number().required(),
      })
      .notRequired(),
  ),
});
